import { Request, Response } from 'express';

export const choiceController = require('express').Router();

choiceController.post('/', async (request: Request, response: Response) => {
  const choice = request.body;
  // TODO: save to participant here

  response.send({ choices: [4, 2] });
});
