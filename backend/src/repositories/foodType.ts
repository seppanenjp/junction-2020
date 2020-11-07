import { EntityRepository, Repository } from 'typeorm';
import { FoodType } from '../entities/foodType';

@EntityRepository(FoodType)
export class FoodTypeRepository extends Repository<FoodType> {}
