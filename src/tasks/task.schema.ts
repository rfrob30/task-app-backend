import * as mongoose from 'mongoose';
import { Task } from './task.interface';

export const TaskSchema = new mongoose.Schema<Task>(
  {
    name: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    versionKey: false,
  },
);
