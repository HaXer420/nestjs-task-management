/* eslint-disable prettier/prettier */
import { PipeTransform, BadRequestException } from '@nestjs/common';
import { taskStatus } from '../task-status.enum';
export class TaskStatusValidationPipe implements PipeTransform {
  readonly StatusValuesAllowed = [
    taskStatus.DONE,
    taskStatus.INPROGRESS,
    taskStatus.OPEN,
  ];
  transform(value: any) {
    value = value.toUpperCase();

    if (!this.validateStatusValue(value)) {
      throw new BadRequestException(` "${value}" is an invalid status`);
    }

    return value;
  }
  private validateStatusValue(status: any) {
    const idx = this.StatusValuesAllowed.indexOf(status);
    return idx !== -1;
  }
}
