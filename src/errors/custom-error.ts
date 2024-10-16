import { StatusCodes } from 'http-status-codes';

class CustomApiError extends Error {
  constructor(message: string) {
    super(message);
  }
}

module.exports = CustomApiError;
