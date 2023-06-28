/* eslint-disable prettier/prettier */
import { taskStatus } from '../tasks.model';
import { IsNotEmpty, IsOptional, IsIn } from 'class-validator';

export class GetTaskFilterDTO {
  @IsOptional()
  @IsIn([taskStatus.DONE, taskStatus.INPROGRESS, taskStatus.OPEN])
  status: taskStatus;

  @IsOptional()
  @IsNotEmpty()
  search: string;
}
