import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import { ErrorRequestHandler } from 'express';

interface MyError extends Error {
  statusCode: number;
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

  res
    .status(customError.statusCode)
    .json({ sucess: false, msg: customError.message });
};

export default errorHandler;
