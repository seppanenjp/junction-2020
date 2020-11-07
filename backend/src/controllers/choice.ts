import { Request, Response } from 'express';

export const choiceController = require('express').Router();

choiceController.post('/', async (request: Request, response: Response) => {
  const choice = request.body;

  const foodType: number[] = choice.foodType;
  const result: number = choice.result;
  const participantId: string = choice.participantId;


  let A = MATRIX_FROM_DATABASE

  if (result) {
    let subscription = foodType.reverse();
  } else {
    let subscription = foodType;
  }
  
  A[foodType[0]][foodType[1]] = 0;
  A[foodType[1]][foodType[0]] = 1;
  
  let N = A.length;
  let combos = [];
  for (i = 0; i < N; i++) { 
    for (j = 0; j < i; j++) {
      if (A[i][j]*A[j][i]==0) {
        combos.push([i,j])
      }
    }
  }
  let combo = combos[Math.floor(Math.random() * N.length)];
  
  // UPDATE PARTICIPANT_DB WITH A

  response.send({ choices: combo}); // return the found pair
});
