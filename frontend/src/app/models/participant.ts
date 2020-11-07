import { Lunch } from './lunch';
import { User } from './user';

export class Participant {
  id: string;
  user?: User;
  userId?: string;
  lunch: Lunch;
  lunchId: string;
  username: string;
  preferences: number[][];
  created: Date;
}
