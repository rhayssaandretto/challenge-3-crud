import mongoose, { Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { IEvent } from './interfaces/event-interface';

const eventSchema: Schema = new Schema<IEvent>(
  {
    _id: {
      type: String,
      default: uuidv4,
      required: true,
    },
    description: {
      type: String,
      required: true,
      minlength: 5,
    },
    dayOfWeek: {
      type: String,
      required: true,
      enum: [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ],
    },
    userId: {
      type: String,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const event = mongoose.model<IEvent>('Event', eventSchema);
