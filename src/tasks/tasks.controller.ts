import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { Task, TaskStatus } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService) {
    }
    @Get()
    getTasks(@Query() filterDto: GetTaskFilterDto): Task[] {
        if (Object.keys(filterDto).length) {
            return this.taskService.getTaskWithFilters(filterDto);
        } else {
            return this.taskService.getAllTasks();
        }
    }
    @Get('/:id')
    getTaskById(@Param('id') id: string): Task {
        return this.taskService.getTaskById(id);
    }

    /* if you use below method you will send data inside headers */
    // @Post()
    // createTask(@Body() body) {
    //     console.log('body', body)
    // }
    /* this method before using DTO */
    // @Post()
    // createTask(
    //     @Body('title') title: string,
    //     @Body('description') description: string
    // ): Task {
    //     // console.log('title', title)
    //     // console.log('description', description)
    //     return this.taskService.createTask(title, description);
    // }
    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto): Task {
        return this.taskService.createTask(createTaskDto);
    }
    @Patch('/:id/status')
    updateTaskStatus(@Param('id') id: string,
        @Body('status') status: TaskStatus): Task {
        return this.taskService.updateTaskStatus(id, status)
    }
    @Delete('/:id')
    deleteTask(@Param('id') id: string) {
        this.taskService.deleteTask(id);
    }
}
