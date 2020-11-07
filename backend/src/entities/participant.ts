import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import { User } from './user';
import { Lunch } from './lunch';

@Entity({ name: 'Participant' })
export class Participant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.participants, {
    onDelete: 'SET NULL'
  })
  @JoinColumn({ name: 'userId' })
  user?: User;

  @Column({ type: 'uuid', nullable: true })
  userId?: string;

  @ManyToOne(() => Lunch, (lunch) => lunch.participants, {
    onDelete: 'SET NULL'
  })
  lunch: Lunch;

  @JoinColumn({ name: 'lunchId' })
  lunchId: string;

  @Column({ length: 255, unique: true })
  username: string;

  @Column({ type: 'simple-json' })
  preferences: number[][];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created: Date;
}
