import { Lunch } from './lunch';
import { User } from './user';

export enum Status {
  Ready = 'Ready',
  Pending = 'Pending'
}

export class Participant {
  id: string;
  user?: User;
  userId?: string;
  lunch: Lunch;
  lunchId: string;
  username: string;
  preferences: number[][];
  status: Status;
  created: Date;
}
