import NotFoundError from '../../utils/errors/NotFoundError';
import { GetEventsDTO } from '../DTO/GetEventsDTO';
import { CreateEventDTO } from '../DTO/CreateEventDTO';
import EventRepository from '../repositories/EventRepository';
import { IEvent } from '../../models/interfaces/event-interface';
import UserRepository from '../../user/repositories/UserRepository';
import { IUser } from 'models/interfaces/user-interface';

export default class EventService {
  private readonly _eventRepository: EventRepository;
  private readonly _userRepository: UserRepository;

  constructor() {
    this._eventRepository = new EventRepository();
    this._userRepository = new UserRepository();
  }

  async create(event: CreateEventDTO, email: string) {
    const user: IUser | null = await this._userRepository.findByEmail(email);

    if (!user) {
      throw new NotFoundError('User not found!');
    }

    const newEvent: IEvent = {
      description: event.description,
      dayOfWeek: event.dayOfWeek,
      userId: user._id,
    } as unknown as IEvent;

    await this._eventRepository.create(newEvent);
  }

  async getAll(event: GetEventsDTO): Promise<IEvent[] | null> {
    const { dayOfWeek, description } = event;
    if (dayOfWeek || description) {
      return this._eventRepository.findByWeekdayOrDescription(
        dayOfWeek || '',
        description || '',
      );
    }

    return this._eventRepository.findAll();
  }

  async getById(id: string): Promise<IEvent | null> {
    const search = this._eventRepository.findById(id);

    if (!search) {
      throw new NotFoundError(`Event with ID ${id} not found.`);
    }

    return search;
  }

  async deleteById(id: string): Promise<void> {
    const search = this._eventRepository.deleteById(id);

    if (!search) {
      throw new NotFoundError(`Event with ID ${id} not found.`);
    }
  }

  async deleteByWeekday(dayOfWeek: string): Promise<void> {
    const search = this._eventRepository.deleteByWeekday(dayOfWeek);

    if (!search) {
      throw new NotFoundError('Event not found.');
    }
  }
}
