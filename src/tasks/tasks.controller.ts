// src/tasks/tasks.controller.ts
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import * as tasksInterface from './tasks.interface';
import { CreateTaskDto } from './dto/create-tasks.dto';
import { UpdateTaskDto } from './dto/update-tasks.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getAllTasks(): tasksInterface.Task[] {
    return this.tasksService.getAllTasks();
  }

  @Get(':id')
  getTaskById(@Param('id') id: string): tasksInterface.Task {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): tasksInterface.Task {
    const { title, description } = createTaskDto;
    return this.tasksService.createTask(title, description);
  }

  @Put(':id')
  updateTask(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): tasksInterface.Task {
    const { title, description, status } = updateTaskDto;
    return this.tasksService.updateTask(id, title, description, status);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string): { message: string } {
    this.tasksService.deleteTask(id);
    return { message: 'Task deleted successfully' };
  }
}
