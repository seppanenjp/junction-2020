import { Request, Response } from 'express';
import { nanoid } from 'nanoid';
import { getCustomRepository } from 'typeorm';
import { Lunch } from '../entities/lunch';
import { LunchRepository } from '../repositories/lunch';
import { v4 as uuid } from 'uuid';

export const lunchController = require('express').Router();

lunchController.post(
  '/create',
  async (request: Request, response: Response) => {
    const lunch: Lunch = { ...request.body };
    console.log(lunch);
    const lunchRepository: LunchRepository = getCustomRepository(
      LunchRepository
    );
    lunchRepository
      .save(lunch)
      .then((lunch) => {
        response.send(lunch);
      })
      .catch((e) => {
        console.log(e);
        response.status(500).send({ message: '' });
      });
  }
);
