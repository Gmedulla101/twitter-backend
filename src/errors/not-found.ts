import { STATUS_CODES } from 'http';
import { StatusCodes } from 'http-status-codes';
const CustomApiError = require('./custom-error');

class NotFoundError extends CustomApiError {
  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

export default NotFoundError;
