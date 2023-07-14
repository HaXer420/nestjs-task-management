/* eslint-disable prettier/prettier */
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { taskStatus } from './task-status.enum';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDTO } from './dto/search-task.dto';
import { User } from 'src/auth/auth.entity';

@Injectable()
export class TaskRepository {
  constructor(
    @InjectRepository(Task)
    private taskEntity: Repository<Task>,
  ) {}

  async createTask(createTaskDto: createTaskDto, user: User): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = taskStatus.OPEN;
    task.user = user;
    await task.save();
    delete task.user;
    return task;
  }

  async getTasks(filterDTO: GetTaskFilterDTO, user: User): Promise<Task[]> {
    const { search, status } = filterDTO;
    const query = this.taskEntity.createQueryBuilder('task');

    query.where('task.userId = :userId', { userId: user.id });

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

  async getTaskbyId(id: number, user: User): Promise<Task> {
    const task = await this.taskEntity.findOne({
      where: { id, userId: user.id },
    });
    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return task;
  }

  async deleteTaskbyId(id: number, user: User): Promise<void> {
    const result = await this.taskEntity.delete({ id, userId: user.id });
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }

  async updateTaskStatus(
    id: number,
    status: taskStatus,
    user: User,
  ): Promise<Task> {
    const task = await this.getTaskbyId(id, user);
    task.status = status;
    await task.save();
    return task;
  }
}
