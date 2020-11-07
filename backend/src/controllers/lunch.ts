import { Request, Response } from 'express';
import { nanoid } from 'nanoid';
import { getCustomRepository } from 'typeorm';
import { Lunch } from '../entities/lunch';
import { LunchRepository } from '../repositories/lunch';
import { ParticipantRepository } from '../repositories/participant';
import { Participant, Status } from '../entities/participant';
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
    restaurants.forEach((restaurant) => {
      console.log(restaurant);
      const distance = getDistance(
        { latitude: restaurant.latitude, longitude: restaurant.longitude },
        { latitude: lunch.latitude, longitude: lunch.longitude }
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

lunchController.post(
  '/:lunchId/join',
  async (request: Request, response: Response) => {
    const { lunchId } = request.params;
    const participant = {
      ...request.body,
      preferences: [],
      lunchId,
      status: Status.Pending
    };
    for (const i; i <20; i++) {
      const temp = [];
      for (const j; j<20; j++) {
        if (i==j) {
          temp.push(0)
        } else {
          temp.push(0.5);
        }
      }
      participant.preferences.push(temp);
    }

    const participantRepository: ParticipantRepository = getCustomRepository(
      ParticipantRepository
    );

    participantRepository
      .save(participant)
      .then((savedParticipant: Participant) => {
        let combos = [];
        for (const i =0; i<20; i++) {
          for (const j=0;j<i; j++) {
            if (i!=j) {
              combos.push([i,j]);
            }
          }
        }
        const c = combos.length;
        first_combo = combos[Math.floor(Math.random()*20)]
        
        response.send(savedParticipant);
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

function customArgMax(arr) {
  var max_value = 0;
  var arg_max = 0;
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > max_value) {
      arg_max = i;
    } else {
      // No action
    }
  }
  return arg_max;
}

function calculateUtilities(utility_value_matrix) {
  var restaurant_rankings = [];
  for (
    var column_index = 0;
    column_index < utility_value_matrix[0].length;
    column_index++
  ) {
    var val = 0;
    for (
      var row_index = 0;
      row_index < utility_value_matrix.length;
      row_index++
    ) {
      val += utility_value_matrix[row_index][column_index];
    }
    restaurant_rankings.push(val);
  }
  return restaurant_rankings;
}

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

    const restaurantRepository: RestaurantRepository = getCustomRepository(
      RestaurantRepository
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

          // Loop all available restaurants
          lunchRepository.findOne({where: {lunchId}}).
          then((lunch: Lunch) => {
            lunch.possibleRestaurants.forEach((restaurant_id) =>{
              restaurantRepository.findOne({where: {restaurant_id}})
              .then((restaurant) => {
                var max_value = 0;
                // Find maximum value from values
                restaurant.foodTypes.forEach((food_type) => {
                  if (values[food_type] > max_value) {
                    max_value = values[food_type];
                  }
                })
                utilities.push(max_value);
              })
            });

          utility_value_matrix.push(utilities);
        });

        var restaurant_rankings = calculateUtilities(utility_value_matrix);
        var restaurantIdx = customArgMax(restaurant_rankings);  // This is index of luchPossible restaurants array

        lunchRepository.findOne({where: {lunchId}})
        .then((lunch: Lunch) => {
            var optimal_restaurant = lunch.possibleRestaurants[restaurantIdx]; // <--- This is the restaurant to be saved
          })
        })
    })
      .catch(() => {
        response.status(500).send({ message: 'Unable to fetch participants' });
      });
    });
