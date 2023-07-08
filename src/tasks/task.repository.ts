/* eslint-disable prettier/prettier */
import { Repository, EntityRepository } from 'typeorm';
import { Task } from './task.entity';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { taskStatus } from './task-status.enum';

@Entity()
export class TaskRepository extends Repository<Task> {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column()
  status: taskStatus;
}
