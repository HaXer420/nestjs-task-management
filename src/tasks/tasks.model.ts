/* eslint-disable prettier/prettier */
export interface Tasks {
  id: string;
  title: string;
  description: string;
  status: taskStatus;
}

export enum taskStatus {
  OPEN = 'OPEN',
  DONE = 'DONE',
  INPROGRESS = 'IN_PROGRESS',
}