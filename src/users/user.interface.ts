import { Document } from 'mongoose';

export interface User extends Document {
  checkPassword(password: string, arg1: (err: any, isMatch: any) => void);
  email: string;
  password: string;
}
