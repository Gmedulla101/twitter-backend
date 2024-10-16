import { STATUS_CODES } from 'http';
import { StatusCodes } from 'http-status-codes';
const CustomApiError = require('./custom-error');

class UnauthenticatedError extends CustomApiError {
  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

export default UnauthenticatedError;
