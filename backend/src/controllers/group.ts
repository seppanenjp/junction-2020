import { Request, Response } from 'express';
import { nanoid } from 'nanoid';

export const groupController = require('express').Router();

groupController.post('/create', async (request: Request, response: Response) => {
    response.send({groupid: nanoid()});
} );