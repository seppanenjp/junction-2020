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
  preferences: number[][] = [];

  @Column({
    type: 'enum',
    enum: [Status.Ready, Status.Pending],
    default: Status.Pending
  })
  status: Status;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created: Date;
}

export const initPreferences = (): number[][] => {
  const preferences = [];
  for (let i = 0; i < 20; i++) {
    let temp = [];
    for (let j = 0; j < 20; j++) {
      if (i == j) {
        temp.push(0);
      } else {
        temp.push(0.5);
      }
    }
    preferences.push(temp);
  }
  return preferences;
};
