/* eslint-disable prettier/prettier */
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { taskStatus } from './task-status.enum';
import { User } from 'src/auth/auth.entity';

@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: taskStatus;

  @ManyToOne((type) => User, (user) => user.tasks, { eager: false })
  user: User;

  @Column()
  userId: number;
}
