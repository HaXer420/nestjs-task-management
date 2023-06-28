import {
  Body,
  Controller,
  Delete,
  Get,
  Query,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Tasks, taskStatus } from './tasks.model';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDTO } from './dto/search-task.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}
  @Get()
  getTasks(@Query(ValidationPipe) filterTaskDTO: GetTaskFilterDTO): Tasks[] {
    if (Object.keys(filterTaskDTO).length) {
      return this.tasksService.getFilteredTasks(filterTaskDTO);
    } else {
      return this.tasksService.getAllTasks();
    }
    // console.log('hello');
  }

  @Get('/:id')
  getTaskbyId(@Param('id') id: string): Tasks {
    return this.tasksService.getTaskbyId(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
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
    @Body('status', TaskStatusValidationPipe) status: taskStatus,
  ): Tasks {
    return this.tasksService.updateTaskStatus(id, status);
  }
}
