import { IUser } from '../models/interfaces/user-interface';
import { user } from '../models/User';
import { Model } from 'mongoose';
import { IRepository } from './IUserRepository';

export default class UserRepository implements IRepository<IUser> {
  private readonly UserModel: Model<IUser>;

  constructor() {
    this.UserModel = user;
  }

  async create(user: IUser) {
    const newUser = new this.UserModel(user);
    return await newUser.save();
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return this.UserModel.findOne({ email: email }).exec();
  }
}
