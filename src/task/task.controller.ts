import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './task.interface';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  findAll(): Task[] {
    return this.taskService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Task {
    return this.taskService.findOne(id);
  }

  @Post()
  create(@Body() task: Omit<Task, 'id'>): Task {
    return this.taskService.create(task);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatedTask: Partial<Task>): Task {
    return this.taskService.update(id, updatedTask);
  }

  @Delete(':id')
  delete(@Param('id') id: string): void {
    this.taskService.delete(id);
  }
}
