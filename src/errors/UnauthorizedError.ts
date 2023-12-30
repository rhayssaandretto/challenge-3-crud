import { StatusCodes } from 'http-status-codes';

export default class UnauthorizedError extends Error {
  statusCode: StatusCodes;
  constructor(message: string) {
    super(message);
    this.name = 'Unauthorizedr';
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}
