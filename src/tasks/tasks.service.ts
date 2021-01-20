import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import * as uuid from 'uuid';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
@Injectable()
export class TasksService {
    private tasks: Task[] = [];
    getAllTasks(): Task[] {
        return this.tasks;
    }
    getTaskWithFilters(filterDto: GetTaskFilterDto): Task[] {
        const { status, search } = filterDto;

        let tasks = this.getAllTasks();
        if (status) {
            tasks = this.tasks.filter(task => task.status === status)
        }
        if (search) {
            tasks = this.tasks.filter(task =>
                task.title.includes(search) ||
                task.description.includes(search))
        }
        return tasks;
    }
    getTaskById(id: string): Task {
        return this.tasks.find(task => task.id === id);
    }
    /* before using DTO and desctuctring  */
    // createTask(title: string, description: string): Task {
    //     const task: Task = {
    //         id: (Math.random() * 100).toString(),
    //         title,
    //         description,
    //         status: TaskStatus.DONE
    //     };
    //     this.tasks.push(task);
    //     return task;
    // }
    createTask(createTaskDto): Task {
        const { title, description } = createTaskDto;
        const task: Task = {
            id: Math.round((Math.random() * 100)).toString(),
            title,
            description,
            status: TaskStatus.DONE
        }
        this.tasks.push(task);
        return task;
    }
    updateTaskStatus(id: string, status: TaskStatus): Task {
        const task = this.getTaskById(id);
        task.status = status;
        return task;
    }
    deleteTask(id: string): void {
        this.tasks = this.tasks.filter(task => task.id !== id)
    }
}
