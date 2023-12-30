import mongoose, { Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { IUser } from './interfaces/user-interface';

const userSchema: Schema = new Schema<IUser>(
  {
    _id: {
      type: String,
      default: uuidv4,
      required: true,
    },
    firstName: {
      type: String,
      required: [true, 'Please provide first name!'],
      minlength: 5,
    },
    lastName: {
      type: String,
      required: [true, 'Please provide last name!'],
      minlength: 5,
    },
    birthDate: {
      type: Date,
      required: [true, 'Please provide a birth date!'],
    },
    city: {
      type: String,
      required: [true, 'Please provide city!'],
    },
    country: {
      type: String,
      required: [true, 'Please provide country!'],
    },
    email: {
      type: String,
      required: [true, 'Please provide an email!'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please provide a password!'],
    },
  },
  {
    timestamps: true,
  },
);

export const user = mongoose.model<IUser>('User', userSchema);
