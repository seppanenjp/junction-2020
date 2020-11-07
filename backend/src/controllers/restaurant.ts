import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { RestaurantRepository } from '../repositories/restaurant';
import { Restaurant } from '../entities/restaurant';

export const restaurantController = require('express').Router();

restaurantController.get(
  '/:restaurantId',
  async (request: Request, response: Response) => {
    const { restaurantId } = request.params;
    const restaurantRepository: RestaurantRepository = getCustomRepository(
      RestaurantRepository
    );
    restaurantRepository
      .findOne({ where: { id: restaurantId } })
      .then((restaurant: Restaurant) => {
        if (!restaurant) {
          return response.status(404).send({ message: 'No restaurant found' });
        }
        response.send(restaurant);
      })
      .catch(() => {
        response.status(500).send({ message: 'Unable to fetch restaurant' });
      });
  }
);
