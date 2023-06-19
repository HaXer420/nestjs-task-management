import { Body, Controller, Get, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Tasks } from './tasks.model';
import { createTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}
  @Get()
  getAllTasks(): Tasks[] {
    // console.log('hello');
    return this.tasksService.getAllTasks();
  }

  @Post()
  createTask(@Body() createTaskDto: createTaskDto) {
    console.log('title:', createTaskDto.title);
    console.log('description:', createTaskDto.description);

    return this.tasksService.createTask(createTaskDto);
  }
}
