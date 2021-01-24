import { EntityRepository, Repository } from "typeorm";
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTaskFilterDto } from "./dto/get-task-filter.dto";
import { TaskStatus } from "./task-status.enum";
import { Task } from "./task.entity";
@EntityRepository(Task)
export class TaskRepository extends Repository<Task>{
    async getTasks(filterDto: GetTaskFilterDto): Promise<Task[]> {
        const { status, search } = filterDto;
        const query = this.createQueryBuilder('task');

        if (status) {
            query.andWhere('task.status = :status', { status });
        }
        if (search) {
            // using %${search}% that mean search on some of word not all word and take care of make variable like this :search dont add space after : 
             query.andWhere('task.title LIKE :search OR task.description LIke :search', { search: `%${search}%` })
        }
        const task = await query.getMany();
        return task;
    }
    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        const { title, description } = createTaskDto;
        const task = new Task();
        task.title = title;
        task.description = description;
        task.status = TaskStatus.OPEN;
        await task.save();
        return task;
    }

}