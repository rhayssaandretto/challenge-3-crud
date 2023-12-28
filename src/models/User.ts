import mongoose, { Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { IUser } from './interfaces/user-interface';

const userSchema: Schema = new Schema<IUser>(
  {
    _id: { type: String, default: uuidv4, required: true },
    firstName: { type: String, required: true, minlength: 5 },
    lastName: { type: String, required: true, minlength: 5 },
    birthDate: { type: Date, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<IUser>('User', userSchema);
