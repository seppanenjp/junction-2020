import { Request, Response } from 'express';
import { nanoid } from 'nanoid';
import { getCustomRepository } from 'typeorm';
import { Lunch } from '../entities/lunch';
import { LunchRepository } from '../repositories/lunch';
import { ParticipantRepository } from '../repositories/participant';
import { Participant } from '../entities/participant';
import { RestaurantRepository } from '../repositories/restaurant';
import { getDistance } from 'geolib';

export const lunchController = require('express').Router();

const maxAllowedDistance = 2000;

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
    restaurants.forEach( (restaurant) => {
      const distance = getDistance(
        {latitude: restaurant.latitude, longitude: restaurant.longitude},
        {latitude: lunch.latitude, longitude: lunch.longitude}
      );
      if (distance <= maxAllowedDistance) {
        filteredRestaurantIds.push(restaurant.id);
      }
    });
    lunch.possibleRestaurants = filteredRestaurantIds;
    console.log(lunch);

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
        console.log(e);
        response.status(500).send({ message: 'Unable to fetch participants' });
      });
  }
);

lunchController.get(
  '/lunch/:lunchId/ready',
  async (request: Request, response: Response) => {
    const { lunchId } = request.params;
    const participantRepository: ParticipantRepository = getCustomRepository(
      ParticipantRepository
    );

    const lunchRepository: LunchRepository = getCustomRepository(
      LunchRepository
    );


    participantRepository
      .findParticipantsByLunchId(lunchId)
      .then((participants: Participant[]) => {
        let utility_value_matrix = []; // # participants times restaurants

        // Get all
        participants.forEach((participant) => {
          let values = [];
          participant.preferences.forEach((row_item) => {
            values.push(row_item.reduce((a, b) => a + b));
          });

          // create vector containing utility values from each each restaurant
          let utilities = [];
          // calculated by taking maximum from available categories
              // Loop all restaurants
          lunchRepository.findOne({where: {lunchId}}).
          then((lunch: Lunch) => {
            lunch.possibleRestaurants.forEach((restaurant) =>{
              var max_value = 0;

              // Loop all category integers
              // restaurant.foodTypes.forEach((food_type) => {
                // food_type
              // })
            });
          }).catch(() => {
            response.status(500).send({ message: 'Unable to fetch lunch.'})
          })

          utility_value_matrix.push(utilities);
        });

        // Sum all rows --> utility for each restaurant

        var restaurant_rankings = [];
        for (var column_index=0; column_index < utility_value_matrix[0].length; column_index++) {
          var val = 0;
          for (var row_index=0; row_index < utility_value_matrix.length; row_index++) {
            val += utility_value_matrix[row_index][column_index];
          }
          restaurant_rankings.push(val);
        }
        var max_value = 0;
        var arg_max = 0;
        for (var i=0; i < restaurant_rankings.length; i++) {
          if (restaurant_rankings[i] > max_value) {
            arg_max = i;
          } else {
            // No action
          }
        }
        })

      .catch(() => {
        response.status(500).send({ message: 'Unable to fetch participants' });
      });
  }
);
