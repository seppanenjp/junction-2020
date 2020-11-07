import { EntityRepository, Repository } from 'typeorm';
import { Restaurant } from '../entities/restaurant';

@EntityRepository(Restaurant)
export class RestaurantRepository extends Repository<Restaurant> {}
