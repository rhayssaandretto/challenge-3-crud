import { Request, Response, RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import UserService from '../services/UserService';
import ErrorHandler from '../../utils/errors/ErrorHandler';
import Auth from '../../utils/Auth';
import { CreateUserDTO } from '../DTO/createUserDTO';
import { SignInDTO } from '../DTO/signInDTO';

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
      await this._userService.create(createUserDTO);

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
      const user = await this._userService.signIn(signInDTO);
      const token = Auth.generateToken({ email: signInDTO.email });

      response
        .status(StatusCodes.OK)
        .json({ message: 'User logged in successfully!', user, token });
      //.set('Authorization', `Bearer ${token}`);
    } catch (error: unknown) {
      ErrorHandler.handler(error, response);
    }
  };
}
