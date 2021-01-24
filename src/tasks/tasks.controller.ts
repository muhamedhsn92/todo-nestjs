import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService) {
    }

    @Get()
    getTasks(@Query(ValidationPipe) filterDto: GetTaskFilterDto):Promise<Task[]> {
        return this.taskService.getTask(filterDto);
    }
    @Get('/:id')
    getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
        return this.taskService.getTaskById(id);
    }

    // /* if you use below method you will send data inside headers */
    // // @Post()
    // // createTask(@Body() body) {
    // //     console.log('body', body)
    // // }
    // /* this method before using DTO */
    // // @Post()
    // // createTask(
    // //     @Body('title') title: string,
    // //     @Body('description') description: string
    // // ): Task {
    // //     // console.log('title', title)
    // //     // console.log('description', description)
    // //     return this.taskService.createTask(title, description);
    // // }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
        return this.taskService.createTask(createTaskDto);
    }
    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', TaskStatusValidationPipe) status: TaskStatus): Promise<Task> {
        return this.taskService.updateTask(id, status)
    }

    @Delete('/:id')
    deleteTask(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.taskService.deleteTask(id);
    }
}
