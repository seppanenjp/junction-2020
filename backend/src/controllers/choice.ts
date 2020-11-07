import { Request, Response } from 'express';

export const choiceController = require('express').Router();

choiceController.post('/', async (request: Request, response: Response) => {
  const choice = request.body;

  const foodType: number[] = choice.foodType;
  const result: number = choice.result;
  const participantId: string = choice.participantId;

  // TODO: save to participant here

  response.send({ choices: [4, 2] });
});
