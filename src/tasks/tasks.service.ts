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
}
