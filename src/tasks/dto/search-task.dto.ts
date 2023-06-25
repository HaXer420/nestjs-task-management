/* eslint-disable prettier/prettier */
import { taskStatus } from "../tasks.model";

export class GetTaskFilterDTO {
    status: taskStatus;
    search: string;
}