/* eslint-disable prettier/prettier */
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { taskStatus } from './task-status.enum';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TaskRepository {
  constructor(
    @InjectRepository(Task)
    private taskEntity: Repository<Task>,
  ) {}

  async getTaskbyId(id: number): Promise<Task> {
    return await this.taskEntity.findOne({ where: { id } });
  }
}
