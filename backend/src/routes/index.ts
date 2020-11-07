import { Router, Request, Response } from 'express';
import { lunchController } from '../controllers/lunch';

export const routes = Router();

routes.use('/lunch', lunchController);

routes.use('/', (request: Request, response: Response) => {
  response.send({ info: 'Luncher backend' });
});
