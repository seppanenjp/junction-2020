import { Router, Request, Response } from 'express';
import { groupController } from '../controllers/group';

export const routes = Router();

routes.use('/group', groupController);

routes.use('/', (request: Request, response: Response) => {
    response.send({ info: 'Luncher backend' });
  });

