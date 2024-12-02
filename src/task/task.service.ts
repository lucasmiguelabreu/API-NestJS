import { Injectable } from '@nestjs/common';
import { Task } from './task.interface';
import { v4 as uuidv4 } from 'uuid'; // Gera IDs únicos

@Injectable()
export class TaskService {
  private tasks: Task[] = [];

  findAll(): Task[] {
    return this.tasks;
  }

  findOne(id: string): Task {
    return this.tasks.find(task => task.id === id);
  }

  create(task: Omit<Task, 'id'>): Task {
    const newTask = { ...task, id: uuidv4() };
    this.tasks.push(newTask);
    return newTask;
  }

  update(id: string, updatedTask: Partial<Task>): Task {
    const taskIndex = this.tasks.findIndex(task => task.id === id);
    if (taskIndex === -1) return null;

    const task = this.tasks[taskIndex];
    const updated = { ...task, ...updatedTask };
    this.tasks[taskIndex] = updated;
    return updated;
  }

  delete(id: string): void {
    this.tasks = this.tasks.filter(task => task.id !== id);
  }
}
