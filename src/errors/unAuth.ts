const CustomApiError = require('./customError');
import { StatusCodes } from 'http-status-codes';

export default class UnauthenticatedError extends CustomApiError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}
