import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Tasks, taskStatus } from './tasks.model';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}
  @Get()
  getAllTasks(): Tasks[] {
    // console.log('hello');
    return this.tasksService.getAllTasks();
  }

  @Get('/:id')
  getTaskbyId(@Param('id') id: string): Tasks {
    return this.tasksService.getTaskbyId(id);
  }

  @Post()
  createTask(@Body() createTaskDto: createTaskDto): Tasks {
    console.log('title:', createTaskDto.title);
    console.log('description:', createTaskDto.description);

    return this.tasksService.createTask(createTaskDto);
  }

  @Delete('/:id')
  deleteTaskbyId(@Param('id') id: string): void {
    this.tasksService.deleteTaskbyId(id);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body('status') status: taskStatus,
  ): Tasks {
    return this.tasksService.updateTaskStatus(id, status);
  }
}
