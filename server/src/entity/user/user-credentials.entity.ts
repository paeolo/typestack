import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from "typeorm";
import { MinLength } from 'class-validator';

@Entity()
export class UserCredentials {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @MinLength(6,
    { message: 'password is too short. Minimum length is 6 characters' })
  password: string;
}
