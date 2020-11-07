import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Participant } from './participant';

@Entity({ name: 'User' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  password: string;

  @Column({ length: 255, unique: true })
  username: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created: Date;

  @Column({ type: 'simple-json' })
  preferences: number[][][];

  @OneToMany(() => Participant, (participant) => participant.user)
  participants?: Participant[];
}
