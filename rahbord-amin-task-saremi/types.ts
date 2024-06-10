
export enum TaskStatus {
    Doing = "در حال انجام",
    Done = "انجام شده"
  }
export interface TaskType{
    id:number,
title:string,
description:string,
status:TaskStatus
}