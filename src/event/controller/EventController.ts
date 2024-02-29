import ErrorHandler from '../../utils/errors/ErrorHandler';
import {
  CreateEventDTO,
  CreateEventSchema,
  GetEventsDTO,
  GetEventsSchema,
} from '../DTO';
import { StatusCodes } from 'http-status-codes';
import { Request, RequestHandler, Response } from 'express';
import EventService from '../services/EventService';

export default class EventController {
  private _eventService: EventService;

  constructor() {
    this._eventService = new EventService();
  }

  create: RequestHandler = async (
    request: Request,
    response: Response,
  ): Promise<void> => {
    const createEventDTO: CreateEventDTO = request.body;
    const email: string = request.headers.email as string;

    try {
      const validateData = CreateEventSchema.parse(createEventDTO);

      await this._eventService.create(validateData, email);

      response
        .status(StatusCodes.CREATED)
        .json({ message: 'Successful operation!' });
    } catch (error) {
      ErrorHandler.handler(error, response);
    }
  };

  getAll: RequestHandler = async (
    request: Request,
    response: Response,
  ): Promise<void> => {
    const { dayOfWeek, description }: GetEventsDTO = request.query;

    try {
      const validatedData = GetEventsSchema.parse({
        dayOfWeek: dayOfWeek as string,
        description: description as string,
      });

      const search = await this._eventService.getAll(validatedData);

      response.status(StatusCodes.OK).json(search);
    } catch (error) {
      ErrorHandler.handler(error, response);
    }
  };

  getById: RequestHandler = async (
    request: Request,
    response: Response,
  ): Promise<void> => {
    const id = request.params.id;

    try {
      const foundEvent = await this._eventService.getById(id);

      response
        .status(StatusCodes.OK)
        .json({ message: 'Successful operation!', foundEvent });
    } catch (error) {
      ErrorHandler.handler(error, response);
    }
  };

  deleteById: RequestHandler = async (
    request: Request,
    response: Response,
  ): Promise<void> => {
    const id = request.params.id;

    try {
      await this._eventService.deleteById(id);

      response.status(StatusCodes.NO_CONTENT);
    } catch (error) {
      ErrorHandler.handler(error, response);
    }
  };

  deleteByWeekday: RequestHandler = async (
    request: Request,
    response: Response,
  ): Promise<void> => {
    const { dayOfWeek } = request.query;

    try {
      const validatedData = GetEventsSchema.parse({
        dayOfWeek: dayOfWeek as string,
      });

      const search = await this._eventService.deleteByWeekday(
        validatedData.dayOfWeek || '',
      );

      response.status(StatusCodes.OK).json({ deletedEvents: search });
    } catch (error) {
      ErrorHandler.handler(error, response);
    }
  };
}
