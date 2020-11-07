import { Participant } from './participant';

export class User {
  id: string;
  password: string;
  username: string;
  created: Date;
  preferences: number[][][];
  participants?: Participant[];
}
