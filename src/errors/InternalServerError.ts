import { StatusCodes } from 'http-status-codes';
import CustomAPIError from './CustomAPIError';

export default class InternalServerError extends CustomAPIError {
  constructor(message: string) {
    super(message, StatusCodes.INTERNAL_SERVER_ERROR, 'Internal Server Error');
  }
}
