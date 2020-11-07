import { Request, Response } from 'express';
import { nanoid } from 'nanoid';
import { getCustomRepository } from 'typeorm';
import { Lunch } from '../entities/lunch';
import { LunchRepository } from '../repositories/lunch';

export const lunchController = require('express').Router();

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
  '/lunch/:groupId/ready',
  async (request: Request, response: Response) => {
    // TODO: Make lunch ready here -> add restaurant id to lunch

    // Find all participants of the group


    // Calculate values for each user "b = P_tilde.sum(axis=0).flatten() / (N - 1)" --> N x K matrix
    // Iterate all restaurants and calculate maximum value available for each user (from b) --> M x K matrix
    // Sum all columns --> utility for each restaurant
    // Return the restaurant with maximum utility
  }
);
