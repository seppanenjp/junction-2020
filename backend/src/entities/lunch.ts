import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Participant } from './participant';
import { Restaurant } from './restaurant';

@Entity({ name: 'Lunch' })
export class Lunch {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ unique: true })
  groupId: string;

  @Column({ type: 'float' })
  longitude: number;

  @Column({ type: 'float' })
  latitude: number;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.lunches, {
    onDelete: 'SET NULL'
  })
  @JoinColumn({ name: 'restaurantId' })
  restaurant?: Restaurant;

  @Column({ type: 'uuid', nullable: true })
  restaurantId?: string;

  @OneToMany(() => Participant, (participant) => participant.lunch)
  participants?: Participant[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created: Date;
}
