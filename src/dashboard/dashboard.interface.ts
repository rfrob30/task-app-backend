import { Task } from 'src/tasks/task.interface';

export interface Dashboard {
  taskCompleted: number;
  totalTasks: number;
  latestTasks: Task[];
}
