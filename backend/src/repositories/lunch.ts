import { EntityRepository, In, Repository } from 'typeorm';
import { Lunch } from '../entities/lunch';

@EntityRepository(Lunch)
export class LunchRepository extends Repository<Lunch> {
  
}