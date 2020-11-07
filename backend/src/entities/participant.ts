import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import { User } from './user';
import { Lunch } from './lunch';

export enum Status {
  Ready = 'Ready',
  Pending = 'Pending'
}

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
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'lunchId' })
  lunch: Lunch;

  @Column({ type: 'uuid', nullable: true })
  lunchId: string;

  @Column({ length: 255 })
  username: string;

  @Column({ type: 'simple-json' })
  preferences: number[][];

  @Column({
    type: 'enum',
    enum: [Status.Ready, Status.Pending],
    default: Status.Pending
  })
  status: Status;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created: Date;
}
