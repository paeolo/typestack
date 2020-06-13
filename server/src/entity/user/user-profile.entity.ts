import { model, property } from '@loopback/repository';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from "typeorm";

import { required } from '../../utils';

@Entity()
@model()
export class UserProfile {

  @PrimaryGeneratedColumn()
  @property()
  id: number;

  @Column()
  @required()
  firstName: string;

  @Column()
  @required()
  lastName: string;
}
