import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Lunch } from './lunch';

@Entity({ name: 'Restaurant' })
export class Restaurant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255, unique: true })
  name: string;

  @Column({ type: 'int' })
  foodTypes: number;

  @Column({ nullable: true })
  menu?: string;

  @Column({ type: 'float' })
  longitude: number;

  @Column({ type: 'float' })
  latitude: number;

  @OneToMany(() => Lunch, (lunch) => lunch.restaurant)
  lunches?: Lunch[];
}
