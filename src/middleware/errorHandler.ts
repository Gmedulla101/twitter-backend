import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import { ErrorRequestHandler } from 'express';

interface MyError extends Error {
  statusCode: number;
  errors?: any;
  value?: any;
  code?: any;
  keyValue?: any;
}

const errorHandler: ErrorRequestHandler = (
  err: MyError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let customError = {
    message:
      err.message || "Something went terribly wrong, we'll fix it in a bit",
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
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

  res
    .status(customError.statusCode)
    .json({ sucess: false, msg: customError.message });
};

export default errorHandler;
