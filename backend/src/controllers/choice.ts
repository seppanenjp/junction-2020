import { Request, Response } from 'express';
import { ParticipantRepository } from '../repositories/participant';
import { getCustomRepository } from 'typeorm';

export const choiceController = require('express').Router();

choiceController.post('/', async (request: Request, response: Response) => {
  const choice = request.body;

  console.log(choice);

  const participantRepository: ParticipantRepository = getCustomRepository(
    ParticipantRepository
  );

  const participant = await participantRepository.findOne({
    where: { id: choice.participantId }
  });

  let A = participant.preferences;

  let subscription = choice.foodType;

  console.log('result', Boolean(choice.result === subscription[0]));
  if (Boolean(choice.result === subscription[0])) {
    subscription = choice.foodType.reverse();
  }

  A[subscription[0]][subscription[1]] = 0;
  A[subscription[1]][subscription[0]] = 1;

  let N = A.length;
  console.log('N', N);
  let combos = [];
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < i; j++) {
      if (A[i][j] * A[j][i] == 0) {
        combos.push([i, j]);
      }
    }
  }

  console.log('combos', combos);
  let combo = combos[Math.floor(Math.random() * N)];
  console.log('selected combo', combo);

  // UPDATE PARTICIPANT_DB WITH A

  response.send({ choices: combo }); // return the found pair
});
