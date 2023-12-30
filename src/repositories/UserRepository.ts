import { IUser } from 'models/interfaces/user-interface';
import { user } from 'models/User';
import { Model } from 'mongoose';
import { IRepository } from './IRepository';

export default class UserRepository implements IRepository<IUser> {
  private readonly UserModel: Model<IUser>;

  constructor() {
    this.UserModel = user;
  }

  async create(user: IUser) {
    const newUser = new this.UserModel(user);
    return await newUser.save();
  }

  async findAll(): Promise<IUser[]> {
    return this.UserModel.find().exec();
  }
}
