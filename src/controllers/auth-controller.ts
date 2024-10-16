import { BadRequestError, UnauthenticatedError } from '../errors';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';

const login = asyncHandler(async (req: Request, res: Response) => {
  res.status(StatusCodes.OK).json({ success: true, msg: 'User has logged in' });
});

const register = asyncHandler(async (req: Request, res: Response) => {
  res
    .status(StatusCodes.OK)
    .json({ success: true, msg: 'User has registered' });
});

export { login, register };
