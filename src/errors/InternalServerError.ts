import { StatusCodes } from 'http-status-codes';

export default class InternalServerError extends Error {
  statusCode: StatusCodes;
  constructor(message: string) {
    super(message);
    this.name = 'Internal Server Error';
    this.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  }
}
