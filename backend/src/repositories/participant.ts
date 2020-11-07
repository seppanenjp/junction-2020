import { EntityRepository, Repository } from 'typeorm';
import { Participant } from '../entities/participant';

@EntityRepository(Participant)
export class ParticipantRepository extends Repository<Participant> {}
