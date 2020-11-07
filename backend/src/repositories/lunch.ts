import { EntityRepository, Repository } from 'typeorm';
import { Lunch } from '../entities/lunch';

@EntityRepository(Lunch)
export class LunchRepository extends Repository<Lunch> {
  async findByGroupId(groupId): Promise<Lunch> {
    return this.findOne({ where: { groupId } });
  }
}
