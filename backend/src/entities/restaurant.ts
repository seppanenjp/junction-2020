import {
  Column,
  Entity,
  PrimaryGeneratedColumn, 
} from 'typeorm';

@Entity({ name: 'Restaurant' })
  export class Restaurant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255, unique: true })
  name: string;

  @Column({ type: 'int' })
  foodTypes: number;

  @Column({ nullable: true})
  menu?: string;
  
  @Column({ type: "float" })
  longitude: number;
  
  @Column({ type: "float" })
  latitude: number;
}