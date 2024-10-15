import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const errorHandler = (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message:
      err.message || "Something went terribly wrong, we'll fix it in bit",
  };

  //VALIDATION ERROR
  if (err.name === 'ValidationError') {
    customError.message = Object.values(err.errors)
      .map((items: any) => items.message)
      .join(', also, ');
    customError.statusCode = 400;
  }

  //CAST ERROR
  if (err.name === 'CastError') {
    customError.message = `No item found with an id of ${err.value}`;
    customError.statusCode = 404;
  }

  // DUPLICATE ERROR
  if (err.code && err.code === 11000) {
    customError.message = `Duplicate value entered for ${Object.keys(
      err.keyValue
    )} field: Email already exists`;
    customError.statusCode = 400;
  }

  return res
    .status(customError.statusCode)
    .json({ success: false, msg: customError.message });
};

export default errorHandler;
