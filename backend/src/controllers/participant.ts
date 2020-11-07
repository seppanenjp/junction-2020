import { ParticipantRepository } from '../repositories/participant';
import { getCustomRepository } from 'typeorm';
import { Status } from '../entities/participant';
import { Request, Response } from 'express';

export const participantController = require('express').Router();

participantController.get(
  '/:participantId/ready',
  async (request: Request, response: Response) => {
    const { participantId } = request.params;
    const participantRepository: ParticipantRepository = getCustomRepository(
      ParticipantRepository
    );

    participantRepository
      .update({ id: participantId }, { status: Status.Ready })
      .then(() => {
        response.send({ message: 'Participant updated' });
      })
      .catch(() => {
        response.status(500).send({ message: 'Unable to update participant' });
      });
  }
);
