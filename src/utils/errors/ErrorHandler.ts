import { StatusCodes } from 'http-status-codes';
import CustomAPIError from './CustomAPIError';
import { Response } from 'express';
import { z } from 'zod';

export default class ErrorHandler {
  static handler(error: unknown, response: Response): void {
    if (error instanceof CustomAPIError) {
      response.status(error.statusCode).json({
        statusCode: error.statusCode,
        error: error.error,
        message: error.message,
      });
    }

    if (error instanceof z.ZodError) {
      const validationErrors = error.errors.map((err) => ({
        resource: err.path.join('.'),
        message: err.message,
      }));

      response.status(StatusCodes.BAD_REQUEST).json({
        type: 'Validation Error',
        errors: validationErrors,
      });
    }

    response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      statusCode: 500,
      error: 'Internal Server Error',
      message: 'Oh, noes! Something went wrong ｡ﾟ･（>_<）･ﾟ｡',
    });
  }
}
