import { Router, Request, Response } from 'express';
import { lunchController } from '../controllers/lunch';
import { choiceController } from '../controllers/choice';
import { createPostgresData } from '../fixtures/data';
import { foodTypeController } from '../controllers/foodtypes';

export const routes = Router();

routes.use('/lunch', lunchController);
routes.use('/choice', choiceController);
routes.use('/foodtypes', foodTypeController);

routes.use('/fixtures', (request: Request, response: Response) => {
  createPostgresData();
  response.send({ info: 'Fixtures created' });
});

routes.use('/', (request: Request, response: Response) => {
  response.send({ info: 'Luncher backend' });
});
