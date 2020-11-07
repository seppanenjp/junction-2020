import { Router, Request, Response } from 'express';
import { lunchController } from '../controllers/lunch';
import { choiceController } from '../controllers/choice';

export const routes = Router();

routes.use('/lunch', lunchController);
routes.use('/choice', choiceController);

routes.use('/', (request: Request, response: Response) => {
  response.send({ info: 'Luncher backend' });
});
