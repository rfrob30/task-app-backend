import { Injectable } from '@nestjs/common';
import { TasksService } from 'src/tasks/tasks.service';

@Injectable()
export class DashboardService {
  constructor(private readonly tasksService: TasksService) {}

  async getSummary() {
    const tasks = await this.tasksService.findAll();

    const response = {
      tasksCompleted: tasks.filter((e) => e.completed).length,
      totalTasks: tasks.length,
      latestTasks: tasks.slice(0, 3), // sample UI for latest tasks have 3 items
    };

    return response;
  }
}
