import { Injectable, NotFoundException, Req } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user-db/user.entity';
@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository
    ) { }
    async getTask(filterDto: GetTaskFilterDto,
        user: User): Promise<Task[]> {
        return this.taskRepository.getTasks(filterDto, user);
    }
    // getAllTasks(): Task[] {
    //     return this.tasks;
    // }
    // // get all tasks if there is no parameters 
    // // in url and get filterd if there is filter in url 
    // getTaskWithFilters(filterDto: GetTaskFilterDto): Task[] {
    //     const { status, search } = filterDto;

    //     let tasks = this.getAllTasks();
    //     if (status) {
    //         tasks = this.tasks.filter(task => task.status === status)
    //     }
    //     if (search) {
    //         tasks = this.tasks.filter(task =>
    //             task.title.includes(search) ||
    //             task.description.includes(search))
    //     }
    //     return tasks;
    // }

    async getTaskById(id: number, user: User): Promise<Task> {
        const found = await this.taskRepository.findOne({ where: { id, userId: user.id } });

        if (!found) {
            throw new NotFoundException(`Task with id : ${id} not found-غير موجود-`);
        }
        return found;
    }
    // getTaskById(id: string): Task {

    //     const found = this.tasks.find(task => task.id === id);
    //     if (!found) {
    //         throw new NotFoundException(`Task with id : ${id} not found  - غير موجود - `);
    //     }
    //     return found;
    // }
    // /* before using DTO and desctuctring  */
    // // createTask(title: string, description: string): Task {
    // //     const task: Task = { 
    // //         id: (Math.random() * 100).toString(),
    // //         title,
    // //         description,
    // //         status: TaskStatus.DONE
    // //     };
    // //     this.tasks.push(task);
    // //     return task;
    // // }
    async createTask(createTaskDto: CreateTaskDto,
        user: User,
    ): Promise<Task> {
        return this.taskRepository.createTask(createTaskDto, user
        );
        // const { title, description } = createTaskDto;
        // const task = new Task();
        // task.title = title;
        // task.description = description;
        // task.status = TaskStatus.OPEN;
        // await task.save();
        // return task;
    }
    // createTask(createTaskDto): Task {
    //     const { title, description } = createTaskDto;
    //     const task: Task = {
    //         id: Math.round((Math.random() * 100)).toString(),
    //         title,
    //         description,
    //         status: TaskStatus.DONE
    //     }
    //     this.tasks.push(task);
    //     return task;
    // }
    async updateTask(id: number, status: TaskStatus, user: User): Promise<Task> {
        const task = await this.getTaskById(id, user);
        task.status = status;
        await task.save();
        return task;
    }
    // updateTaskStatus(id: string, status: TaskStatus): Task {
    //     const task = this.getTaskById(id);
    //     task.status = status;
    //     return task;
    // }
    async deleteTask(id: number, user: User): Promise<any> {
        const result = await this.taskRepository.delete({ id, userId: user.id });
        if (result.affected === 0) {
            throw new NotFoundException(`Task with id : ${id} not found-غير موجود-`);
        } else {
            return 'ok'
        }

    }
    // deleteTask(id: string): void {
    //     this.tasks = this.tasks.filter(task => task.id !== id)
    // }
}
