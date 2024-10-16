import { StatusCodes } from 'http-status-codes';
const CustomApiError = require('./custom-error');

class BadRequestError extends CustomApiError {
  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

export default BadRequestError;
