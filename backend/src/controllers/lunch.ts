import { Request, Response } from 'express';
import { nanoid } from 'nanoid';
import { getCustomRepository } from 'typeorm';
import { Lunch } from '../entities/lunch';
import { LunchRepository } from '../repositories/lunch';
import { ParticipantRepository } from '../repositories/participant';
import { Participant } from '../entities/participant';

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

    participantRepository
      .findParticipantsByLunchId(lunchId)
      .then((participants: Participant[]) => {
        let ft_value_matrix = []; // # partcipants x # categories matrix

        participants.forEach((participant) => {
          let values = [];
          participant.preferences.forEach((row_item) => {
            values.push(row_item.reduce((a, b) => a + b));
          });
          ft_value_matrix.push(values);
        });
        // Iterate all restaurants and calculate maximum value available for each user (from b) --> M x K matrix
        // Sum all columns --> utility for each restaurant
        // Return the restaurant with maximum utility
      })
      .catch(() => {
        response.status(500).send({ message: 'Unable to fetch participants' });
      });
  }
);
