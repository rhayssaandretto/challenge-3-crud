import UnauthorizedError from './errors/UnauthorizedError';
import * as jwt from 'jsonwebtoken';

interface IJwtData {
  email: string;
}

class Auth {
  private static readonly SECRET: string | undefined = process.env.JWT_SECRET;

  public static generateToken(data: IJwtData): string {
    if (Auth.SECRET === undefined) {
      throw new UnauthorizedError('JWT_SECRET is not defined.');
    }
    return jwt.sign(data, Auth.SECRET, { expiresIn: '3h' });
  }

  public static verifyToken(token: string): IJwtData | 'INVALID_TOKEN' {
    if (Auth.SECRET === undefined) {
      throw new UnauthorizedError('JWT_SECRET is not defined.');
    }
    const decoded = jwt.verify(token, Auth.SECRET);
    if (typeof decoded === 'string') {
      return 'INVALID_TOKEN';
    }

    return decoded as IJwtData;
  }
}

export default Auth;
