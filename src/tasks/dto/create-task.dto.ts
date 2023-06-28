/* eslint-disable prettier/prettier */
import { IsNotEmpty } from 'class-validator';
export class createTaskDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}
