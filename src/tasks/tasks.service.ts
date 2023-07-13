import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { taskStatus } from './task-status.enum';
import { createTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDTO } from './dto/search-task.dto';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(private readonly taskRepository: TaskRepository) {}

  async getTasks(filterDTO: GetTaskFilterDTO): Promise<Task[]> {
    return await this.taskRepository.getTasks(filterDTO);
  }

  async getTaskbyId(id: number): Promise<Task> {
    const task = await this.taskRepository.getTaskbyId(id);
    // if (!task) {
    //   throw new HttpException(
    //     `Task with ID "${id}" not found`,
    //     HttpStatus.NOT_FOUND,
    //   );
    // }
    return task;
  }

  async createTask(createTaskDto: createTaskDto): Promise<Task> {
    return await this.taskRepository.createTask(createTaskDto);
  }

  async deleteTaskbyId(id: number): Promise<void> {
    this.taskRepository.deleteTaskbyId(id);
  }

  async updateTaskStatus(id: number, status: taskStatus): Promise<Task> {
    return await this.taskRepository.updateTaskStatus(id, status);
  }

  // private tasks: Tasks[] = [];
  // getAllTasks(): Tasks[] {
  //   return this.tasks;
  // }
  // getFilteredTasks(filterTaskDTO: GetTaskFilterDTO): Tasks[] {
  //   const { status, search } = filterTaskDTO;
  //   let tasks = this.getAllTasks();
  //   if (status) {
  //     tasks = tasks.filter((task) => task.status === status);
  //   }
  //   if (search) {
  //     tasks = tasks.filter(
  //       (task) =>
  //         task.title.includes(search) || task.description.includes(search),
  //     );
  //   }
  //   return tasks;
  // }
  // getTaskbyId(id: string): Tasks {
  //   const task = this.tasks.find((task) => task.id === id);
  //   if (!task) {
  //     throw new NotFoundException(`Task with ID "${id}" not found`);
  //   }
  //   return task;
  // }
  // createTask(createTaskDto: createTaskDto): Tasks {
  //   const { title, description } = createTaskDto;
  //   const task: Tasks = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: taskStatus.OPEN,
  //   };
  //   this.tasks.push(task);
  //   return task;
  // }
  // deleteTaskbyId(id: string): void {
  //   const found = this.getTaskbyId(id);
  //   this.tasks = this.tasks.filter((task) => task.id !== found.id);
  // }
  // updateTaskStatus(id: string, status: taskStatus): Tasks {
  //   const task = this.getTaskbyId(id);
  //   task.status = status;
  //   return task;
  // }
}
