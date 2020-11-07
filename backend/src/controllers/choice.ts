import { Request, Response } from 'express';
import { ParticipantRepository } from '../repositories/participant';
import { getCustomRepository } from 'typeorm';

export const choiceController = require('express').Router();

choiceController.post('/', async (request: Request, response: Response) => {
  const choice = request.body;

  const participantRepository: ParticipantRepository = getCustomRepository(
    ParticipantRepository
  );

  const participant = await participantRepository.findOne({
    where: { id: choice.participantId }
  });

  let preferences = participant.preferences;

  if (choice.result === choice.foodType[0] ? 0 : 1) {
    choice.foodType = choice.foodType.reverse();
  }

  preferences[choice.foodType[0]][choice.foodType[1]] = 0;
  preferences[choice.foodType[1]][choice.foodType[0]] = 1;

  const N = preferences.length;
  const choices = [];
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < i; j++) {
      if (preferences[i][j] * preferences[j][i] !== 0) {
        choices.push([i, j]);
      }
    }
  }

  await participantRepository.save({ ...participant, preferences });
  response.send(choices[Math.floor(Math.random() * choices.length)]);
});
