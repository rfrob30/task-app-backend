import {
  Injectable,
  BadRequestException,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Model } from 'mongoose';
import { Task } from './task.interface';

@Injectable()
export class TasksService {
  constructor(@InjectModel('Task') private taskModel: Model<Task>) {}

  async create(createTaskDto: CreateTaskDto) {
    const newTask = {
      ...createTaskDto,
      completed: false,
    };
    const taskModel = new this.taskModel(newTask);
    return await taskModel.save();
  }

  async findAll() {
    return await this.taskModel.find();
  }

  async findOne(id: number) {
    const task = await this.taskModel.findOne({ _id: id }, (err, results) => {
      console.log(err, results);
    });
    return `This action returns a #${id} task`;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    const updatedTask = await this.taskModel.findOneAndUpdate(
      { _id: id },
      { ...updateTaskDto },
      { returnOriginal: false },
    );

    if (!updatedTask) {
      throw new NotFoundException('Task not found.');
    }

    return updatedTask;
  }

  async remove(id: string) {
    const task = await this.taskModel
      .findOne({ _id: id })
      .orFail(() => new NotFoundException('Task not found.'));

    if (task.completed) {
      throw new BadRequestException('Completed Task cannot be deleted.');
    }

    return this.taskModel.deleteOne({ _id: id }).then((task) => {
      if (task.deletedCount === 1) {
        return { message: 'Successfully deleted task.' };
      }
    });
  }
}
