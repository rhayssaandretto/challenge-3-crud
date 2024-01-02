import { StatusCodes } from 'http-status-codes';
import CustomAPIError from './CustomAPIError';
import { Response } from 'express';

export default class ErrorHandler {
  static handler(error: unknown, response: Response): void {
    if (error instanceof CustomAPIError) {
      response.status(error.statusCode).json({
        statusCode: error.statusCode,
        error: error.error,
        message: error.message,
      });
    }
    response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      statusCode: 500,
      error: 'Internal Server Error',
      message: 'Oh, noes! Something went wrong ｡ﾟ･（>_<）･ﾟ｡',
    });
  }
}
