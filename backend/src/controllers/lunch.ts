import { Request, Response } from 'express';
import { nanoid } from 'nanoid';
import { getCustomRepository } from 'typeorm';
import { Lunch } from '../entities/lunch';
import { LunchRepository } from '../repositories/lunch';
import { ParticipantRepository } from '../repositories/participant';
import { initPreferences, Participant, Status } from '../entities/participant';
import { RestaurantRepository } from '../repositories/restaurant';
import { getDistance } from 'geolib';
import { calculateUtilities, customArgMax, initMatrix } from '../utils/matrix';

export const lunchController = require('express').Router();

const maxAllowedDistance = 10000;

lunchController.post(
  '/create',
  async (request: Request, response: Response) => {
    const lunch: Lunch = { ...request.body, groupId: nanoid() };
    if (!lunch.latitude || !lunch.longitude) {
      return response.status(400).send({ message: 'Position is missing' });
    }
    const lunchRepository: LunchRepository = getCustomRepository(
      LunchRepository
    );

    const restaurantRepository: RestaurantRepository = getCustomRepository(
      RestaurantRepository
    );

    const restaurants = await restaurantRepository.find();
    const filteredRestaurantIds = [];
    restaurants.forEach((restaurant) => {
      const distance = getDistance(
        { latitude: restaurant.latitude, longitude: restaurant.longitude },
        { latitude: lunch.latitude, longitude: lunch.longitude }
      );
      if (distance <= maxAllowedDistance) {
        filteredRestaurantIds.push(restaurant.id);
      }
    });
    lunch.possibleRestaurants = filteredRestaurantIds;

    lunchRepository
      .save(lunch)
      .then((lunch) => {
        response.send(lunch);
      })
      .catch((e) => {
        response.status(500).send({ message: '' });
      });
  }
);

lunchController.post(
  '/:lunchId/join',
  async (request: Request, response: Response) => {
    const { lunchId } = request.params;
    const participant = {
      ...request.body,
      preferences: initPreferences(),
      lunchId,
      status: Status.Pending
    };

    const participantRepository: ParticipantRepository = getCustomRepository(
      ParticipantRepository
    );

    participantRepository
      .save(participant)
      .then((savedParticipant: Participant) => {
        response.send({
          participant: savedParticipant,
          choices: initMatrix()[Math.floor(Math.random() * 20)]
        });
      });
  }
);

lunchController.get(
  '/:groupId',
  async (request: Request, response: Response) => {
    const { groupId } = request.params;

    const lunchRepository: LunchRepository = getCustomRepository(
      LunchRepository
    );

    lunchRepository
      .findByGroupId(groupId)
      .then((lunch?: Lunch) => {
        if (!lunch) {
          return response
            .status(404)
            .send({ message: 'Unable to find lunch group' });
        }
        response.send(lunch);
      })
      .catch(() => {
        response.status(500).send({ message: 'Unable to fetch lunch group' });
      });
  }
);

lunchController.get(
  '/:lunchId/participants',
  async (request: Request, response: Response) => {
    const { lunchId } = request.params;

    const participantRepository: ParticipantRepository = getCustomRepository(
      ParticipantRepository
    );

    participantRepository
      .find({ where: { lunchId } })
      .then((participants: Participant[]) => {
        response.send(participants);
      })
      .catch((e) => {
        response.status(500).send({ message: 'Unable to fetch participants' });
      });
  }
);

lunchController.get(
  '/:lunchId/ready',
  async (request: Request, response: Response) => {
    const { lunchId } = request.params;
    const participantRepository: ParticipantRepository = getCustomRepository(
      ParticipantRepository
    );

    const lunchRepository: LunchRepository = getCustomRepository(
      LunchRepository
    );

    const restaurantRepository: RestaurantRepository = getCustomRepository(
      RestaurantRepository
    );

    const restaurants = await restaurantRepository.find();

    const lunch: Lunch = await lunchRepository.findOne({
      where: { id: lunchId }
    });

    participantRepository
      .findParticipantsByLunchId(lunchId)
      .then((participants: Participant[]) => {
        const utility_value_matrix = []; // # participants times restaurants

        // Get all
        participants.forEach((participant) => {
          let values = [];
          participant.preferences.forEach((row_item) => {
            values.push(row_item.reduce((a, b) => a + b));
          });

          // create vector containing utility values from each each restaurant
          const utilities = [];

          // Loop all available restaurants
          if (!lunch.possibleRestaurants.length) {
            return response
              .status(500)
              .send({ message: 'There are no possible restaurants' });
          }

          lunch.possibleRestaurants.forEach((restaurant_id) => {
            const restaurant = restaurants.find((r) => r.id === restaurant_id);
            let max_value = 0;
            // Find maximum value from values
            restaurant.foodTypes.forEach((food_type) => {
              if (values[food_type] > max_value) {
                max_value = values[food_type];
              }
            });
            utilities.push(max_value);
          });
          utility_value_matrix.push(utilities);

          const restaurant_rankings = calculateUtilities(utility_value_matrix);
          const restaurantIdx = customArgMax(restaurant_rankings); // This is index of luchPossible restaurants array

          const optimal_restaurant = lunch.possibleRestaurants[restaurantIdx]; // <--- This is the restaurant to be saved

          lunchRepository
            .save({ ...lunch, restaurantId: optimal_restaurant })
            .then((lunch: Lunch) => {
              response.send(lunch);
            });
        });
      })
      .catch((e) => {
        response.status(500).send({ message: 'Unable to fetch participants' });
      });
  }
);
