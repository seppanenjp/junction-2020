import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Participant } from './participant';

@Entity({ name: 'Lunch' })
export class Lunch {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Participant, (participant) => participant.lunch, {
    onDelete: 'SET NULL'
  })
  @Column({ type: 'float' })
  longitude: number;

  @Column({ type: 'float' })
  latitude: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created: Date;

  @OneToMany(() => Participant, (participant) => participant.lunch)
  participants?: Participant[];
}
