import { Schema } from 'mongoose';

export interface IEvent extends Document {
  _id: string;
  description: string;
  dayOfWeek: string;
  userId: Schema.Types.ObjectId;
}
