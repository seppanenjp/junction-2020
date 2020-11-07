import { Request, Response } from 'express';

export const choiceController = require('express').Router();

choiceController.post('/', async (request: Request, response: Response) => {
  const choice = request.body;

  const foodType: number[] = choice.foodType;
  const result: number = choice.result;
  const participantId: string = choice.participantId;

  // retrieve matrix from database
  // update selection matrix
  if (result) {
    // A[foodType[0], foodType[1]] = 1
    // A[foodType[1], foodType[0]] = 0
  } else {
    // A[foodType[1], foodType[0]] = 1
    // A[foodType[0], foodType[1]] = 0
  }

  // find pair not explored yet (generate column row indexes and filter out ones containing 0 or 1)

  // update A[food]

  // TODO: save to participant here

  response.send({ choices: [4, 2] }); // return the found pair
});
