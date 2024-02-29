import { event } from '../../models/Event';
import { IEvent } from '../../models/interfaces/event-interface';
import { Model } from 'mongoose';
import { IEventRepository } from './IEventRepository';

export default class EventRepository implements IEventRepository<IEvent> {
  private readonly _eventModel: Model<IEvent>;

  constructor() {
    this._eventModel = event;
  }

  async create(event: IEvent) {
    const newEvent = new this._eventModel(event);

    return await newEvent.save();
  }

  async findAll(): Promise<IEvent[] | null> {
    return this._eventModel.find().exec();
  }

  async findById(id: string): Promise<IEvent | null> {
    return this._eventModel.findById(id);
  }

  async findByWeekdayOrDescription(
    dayOfWeek: string,
    description: string,
  ): Promise<IEvent[]> {
    return this._eventModel.find({
      $or: [{ dayOfWeek: dayOfWeek }, { description: description }],
    });
  }

  async deleteByWeekday(dayOfWeek: string): Promise<any> {
    return this._eventModel.deleteMany({ dayOfWeek: dayOfWeek });
  }

  async deleteById(id: string): Promise<string | void> {
    const result: any = await this._eventModel.findByIdAndDelete(id);
    return result;
  }
}
