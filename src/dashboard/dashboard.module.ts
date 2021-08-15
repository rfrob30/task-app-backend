import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksModule } from 'src/tasks/tasks.module';
import { TasksService } from 'src/tasks/tasks.service';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { TaskSchema } from 'src/tasks/task.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Task', schema: TaskSchema }]),
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    TasksModule,
  ],
  controllers: [DashboardController],
  providers: [TasksService, DashboardService],
})
export class DashboardModule {}
