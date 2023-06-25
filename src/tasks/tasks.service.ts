import { Injectable } from '@nestjs/common';
import { Tasks, taskStatus } from './tasks.model';
import { v1 as uuid } from 'uuid';
import { createTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  private tasks: Tasks[] = [];

  getAllTasks(): Tasks[] {
    return this.tasks;
  }

  getTaskbyId(id: string): Tasks {
    return this.tasks.find((task) => task.id === id);
  }

  createTask(createTaskDto: createTaskDto): Tasks {
    const { title, description } = createTaskDto;

    const task: Tasks = {
      id: uuid(),
      title,
      description,
      status: taskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }

  deleteTaskbyId(id: string): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  updateTaskStatus(id: string, status: taskStatus): Tasks {
    const task = this.getTaskbyId(id);
    task.status = status;
    return task;
  }
}
