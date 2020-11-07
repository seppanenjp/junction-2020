import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { FoodTypeRepository } from '../repositories/foodType';

export const foodTypeController = require('express').Router();

foodTypeController.get('/', async (request: Request, response: Response) => {
  const foodTypeRepository: FoodTypeRepository = getCustomRepository(
    FoodTypeRepository
  );
  foodTypeRepository.find().then((foodTypes) => {
    response.send(foodTypes);
  });
});
