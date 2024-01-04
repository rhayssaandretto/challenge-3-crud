import { StatusCodes } from 'http-status-codes';

export default abstract class CustomAPIError extends Error {
  private _statusCode: StatusCodes = StatusCodes.INTERNAL_SERVER_ERROR;
  private _error: string;

  constructor(message: string, statusCode: StatusCodes, error: string) {
    super(message);
    this._statusCode = statusCode;
    this._error = error;
  }

  public get statusCode(): StatusCodes {
    return this._statusCode;
  }

  public get error(): string {
    return this._error;
  }
}
