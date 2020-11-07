import { Participant } from './participant';
import { Restaurant } from './restaurant';

export class Lunch {
  id: string;
  groupId: string;
  longitude: number;
  latitude: number;
  restaurant?: Restaurant;
  restaurantId?: string;
  participants?: Participant[];
  created: Date;
}
