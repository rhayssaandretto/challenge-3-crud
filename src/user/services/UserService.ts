import BadRequestError from '../../utils/errors/BadRequestError';
import { IUser } from 'models/interfaces/user-interface';
import UserRepository from '../repositories/UserRepository';
import bcrypt from 'bcrypt';
import NotFoundError from '../../utils/errors/NotFoundError';
import UnauthorizedError from '../../utils/errors/UnauthorizedError';
import { SignInResDTO } from '../DTO/signInResDTO';
import { SignInDTO } from '../DTO/signInDTO';
import { CreateUserDTO } from '../DTO/createUserDTO';

export default class UserService {
  private readonly _userRepository: UserRepository;
  constructor() {
    this._userRepository = new UserRepository();
  }

  async create(user: CreateUserDTO): Promise<IUser> {
    if (user.password !== user.confirmPassword) {
      throw new BadRequestError('Passwords do not matches');
    }

    const newUser: IUser = {
      firstName: user.firstName,
      lastName: user.lastName,
      birthDate: user.birthDate,
      city: user.city,
      country: user.country,
      email: user.email,
      password: await bcrypt.hash(user.password, 10),
    } as IUser;

    return this._userRepository.create(newUser);
  }

  async signIn(loggedUser: SignInDTO): Promise<SignInResDTO> {
    const user = await this._userRepository.findByEmail(loggedUser.email);

    if (!user) {
      throw new NotFoundError('User does not exist!');
    }

    const comparePassword = await bcrypt.compare(
      loggedUser.password,
      user.password,
    );

    if (!comparePassword) {
      throw new UnauthorizedError('Invalid credentials!');
    }

    return {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };
  }
}
