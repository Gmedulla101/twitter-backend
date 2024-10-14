const CustomApiError = require('./customError');
import { StatusCodes } from 'http-status-codes';

export default class BadRequestError extends CustomApiError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}
