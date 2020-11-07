import { 
  Column, 
  Entity, 
  PrimaryGeneratedColumn
} from 'typeorm';

@Entity({ name: 'FoodType' })
export class FoodType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;
}
