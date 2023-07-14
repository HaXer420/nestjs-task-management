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
  ParseIntPipe,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TasksService } from './tasks.service';
import { taskStatus } from './task-status.enum';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDTO } from './dto/search-task.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation';
import { Task } from './task.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/auth.entity';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  async getTasks(
    @Query(ValidationPipe) filterDTO: GetTaskFilterDTO,
    @GetUser() user: User,
  ): Promise<Task[]> {
    return this.tasksService.getTasks(filterDTO, user);
  }

  @Get('/:id')
  async getTaskbyId(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksService.getTaskbyId(id, user);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createTask(
    @Body() createTaskDto: createTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    return await this.tasksService.createTask(createTaskDto, user);
  }

  @Delete('/:id')
  deleteTaskbyId(@Param('id', ParseIntPipe) id: number, user: User): void {
    this.tasksService.deleteTaskbyId(id, user);
  }

  @Patch('/:id/status')
  async updateTaskStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', TaskStatusValidationPipe) status: taskStatus,
    user: User,
  ): Promise<Task> {
    return this.tasksService.updateTaskStatus(id, status, user);
  }

  // @Get()
  // getTasks(@Query(ValidationPipe) filterTaskDTO: GetTaskFilterDTO): Tasks[] {
  //   if (Object.keys(filterTaskDTO).length) {
  //     return this.tasksService.getFilteredTasks(filterTaskDTO);
  //   } else {
  //     return this.tasksService.getAllTasks();
  //   }
  //   // console.log('hello');
  // }

  // @Get('/:id')
  // getTaskbyId(@Param('id') id: string): Tasks {
  //   return this.tasksService.getTaskbyId(id);
  // }

  // @Post()
  // @UsePipes(ValidationPipe)
  // createTask(@Body() createTaskDto: createTaskDto): Tasks {
  //   console.log('title:', createTaskDto.title);
  //   console.log('description:', createTaskDto.description);

  //   return this.tasksService.createTask(createTaskDto);
  // }

  // @Delete('/:id')
  // deleteTaskbyId(@Param('id') id: string): void {
  //   this.tasksService.deleteTaskbyId(id);
  // }

  // @Patch('/:id/status')
  // updateTaskStatus(
  //   @Param('id') id: string,
  //   @Body('status', TaskStatusValidationPipe) status: taskStatus,
  // ): Tasks {
  //   return this.tasksService.updateTaskStatus(id, status);
  // }
}
