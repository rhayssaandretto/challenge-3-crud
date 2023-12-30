import { StatusCodes } from 'http-status-codes';

export default class NotFoundError extends Error {
  statusCode: StatusCodes;
  constructor(message: string) {
    super(message);
    this.name = 'Not Found Error';
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}
