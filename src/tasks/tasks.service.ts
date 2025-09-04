import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './tasks.interface'; 

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  constructor() {
    // Tarefas iniciais
    this.tasks = [
      {
        id: '1',
        title: 'Comprar pão',
        description: 'Ir à padaria e comprar pão fresco',
        status: 'PENDING',
      },
      {
        id: '2',
        title: 'Estudar TypeScript',
        description: 'Revisar conceitos básicos e avançados',
        status: 'PENDING',
      },
      {
        id: '3',
        title: 'Fazer exercícios',
        description: 'Praticar exercícios físicos por 30 minutos',
        status: 'DONE',
      },
    ];
  }

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string): Task {
    const task = this.tasks.find((task) => task.id === id);
    if (!task) {
      throw new NotFoundException(`Task com ID "${id}" não encontrada`);
    }
    return task;
  }

  createTask(title: string, description: string): Task {
    const task: Task = {
      id: Math.random().toString(36).substring(2, 9),
      title,
      description,
      status: 'PENDING',
    };
    this.tasks.push(task);
    return task;
  }

  updateTask(
    id: string,
    title?: string,
    description?: string,
    status?: 'PENDING' | 'DONE',
  ): Task {
    const task = this.getTaskById(id);

    if (title !== undefined) {
      task.title = title;
    }

    if (description !== undefined) {
      task.description = description;
    }

    if (status !== undefined) {
      task.status = status;
    }

    return task;
  }

  deleteTask(id: string): void {
    const index = this.tasks.findIndex((task) => task.id === id);
    if (index === -1) {
      throw new NotFoundException(`Task com ID "${id}" não encontrada`);
    }
    this.tasks.splice(index, 1);
  }
}