import { model, property } from '@loopback/repository';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  Unique,
  OneToMany
} from "typeorm";

import { UserRole } from '../../components/jwt';
import { Token, UserProfile, UserCredentials } from '../user';
import { required, enumProperty } from '../../utils';
import { MinLength } from 'class-validator';

@model()
@Entity()
@Unique(["username"])
export class User {

  @PrimaryGeneratedColumn()
  @property()
  id: number;

  @Column()
  @required()
  @MinLength(2,
    { message: 'username is too short' })
  username: string;

  @Column({ type: "enum", enum: UserRole, default: UserRole.MEMBER })
  @enumProperty({ title: 'UserRole', values: UserRole, required: true })
  role: UserRole

  @OneToOne(type => UserCredentials, { cascade: ['insert'] })
  @JoinColumn()
  credentials: UserCredentials;

  @OneToOne(type => UserProfile, { cascade: true })
  @JoinColumn()
  @property()
  profile: UserProfile;

  @OneToMany(type => Token, token => token.user)
  tokens: Token[];
}
