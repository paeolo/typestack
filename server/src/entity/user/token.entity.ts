import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn
} from "typeorm";

import { TokenType } from '../../components/jwt';
import { User } from '../user';

@Entity()
export class Token {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "enum",
    enum: TokenType,
    default: TokenType.AUTH_REFRESH
  })
  type: TokenType;

  @Column({ type: 'timestamptz' })
  expiresIn: Date;

  @Column({ nullable: true })
  userId: number;

  @ManyToOne(type => User, user => user.tokens)
  @JoinColumn()
  user: User;
}
