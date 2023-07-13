/* eslint-disable prettier/prettier */
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { taskStatus } from './task-status.enum';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDTO } from './dto/search-task.dto';

@Injectable()
export class TaskRepository {
  constructor(
    @InjectRepository(Task)
    private taskEntity: Repository<Task>,
  ) {}

  async createTask(createTaskDto: createTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = taskStatus.OPEN;
    await task.save();
    return task;
  }

  async getTasks(filterDTO: GetTaskFilterDTO): Promise<Task[]> {
    const { search, status } = filterDTO;
    const query = this.taskEntity.createQueryBuilder('task');

    if (status) {
      query.andWhere('task.status = :status', { status });
    }
    if (search) {
      query.andWhere(
        '(task.title LIKE :search OR task.description LIKE :search)',
        { search: `%${search}%` },
      );
    }
    const tasks = await query.getMany();
    return tasks;
  }

  async getTaskbyId(id: number): Promise<Task> {
    const task = await this.taskEntity.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return task;
  }

  async deleteTaskbyId(id: number): Promise<void> {
    await this.taskEntity.delete(id);
  }

  async updateTaskStatus(id: number, status: taskStatus): Promise<Task> {
    const task = await this.getTaskbyId(id);
    task.status = status;
    await task.save();
    return task;
  }
}
