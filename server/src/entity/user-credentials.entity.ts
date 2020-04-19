import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from "typeorm";

@Entity()
export class UserCredentials {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  password: string;
}
