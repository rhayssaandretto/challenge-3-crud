import { Request, Response, RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import UserService from '../services/UserService';
import ErrorHandler from '../../utils/errors/ErrorHandler';
import Auth from '../../utils/Auth';
import {
  CreateUserDTO,
  CreateUserSchema,
  SignInDTO,
  SignInSchema,
} from '../DTO';

export default class UserController {
  private _userService: UserService;

  constructor() {
    this._userService = new UserService();
  }

  create: RequestHandler = async (
    request: Request,
    response: Response,
  ): Promise<any> => {
    const createUserDTO: CreateUserDTO = request.body;

    try {
      const validatedData = CreateUserSchema.parse(createUserDTO);

      await this._userService.create(validatedData);

      response
        .status(StatusCodes.CREATED)
        .json({ message: 'User sucessufully created!' });
    } catch (error: unknown) {
      ErrorHandler.handler(error, response);
    }
  };

  signIn: RequestHandler = async (
    request: Request,
    response: Response,
  ): Promise<void> => {
    const signInDTO: SignInDTO = request.body;

    try {
      const validatedData = SignInSchema.parse(signInDTO);

      const user = await this._userService.signIn(validatedData);
      const token = Auth.generateToken({ email: validatedData.email });

      response
        .status(StatusCodes.OK)
        .json({ message: 'User logged in successfully!', user, token });
    } catch (error: unknown) {
      ErrorHandler.handler(error, response);
    }
  };
}
