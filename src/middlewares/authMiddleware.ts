import Auth from '../services/Auth';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export function authMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const { authorization } = request.headers;

  if (!authorization) {
    return response
      .status(StatusCodes.UNAUTHORIZED)
      .json({ error: 'Unauthorized' });
  }

  const [, token] = authorization.split(' ');

  const tokenData = Auth.verifyToken(token);

  if (tokenData === 'INVALID_TOKEN') {
    return response
      .status(StatusCodes.UNAUTHORIZED)
      .json({ error: 'Unauthorized' });
  }

  request.headers.email = tokenData.email;

  next();
}
