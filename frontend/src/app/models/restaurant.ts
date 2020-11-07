import { Lunch } from './lunch';

export class Restaurant {
  id: string;
  name: string;
  foodTypes: number[];
  menu?: string;
  longitude: number;
  latitude: number;
  lunches?: Lunch[];
}
