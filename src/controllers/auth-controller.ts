import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import asyncHandler from 'express-async-handler';
//IMPORTING ERRORS
import BadRequestError from '../errors/badRequest';
import UnauthenticatedError from '../errors/unAuth';

//CONTROLLERS
const register = asyncHandler(async (req: Request, res: Response) => {
  res
    .status(StatusCodes.OK)
    .json({ success: true, msg: 'User has been registered' });
});

const login = asyncHandler(async (req: Request, res: Response) => {
  res.status(StatusCodes.OK).json({ success: true, msg: 'User logged in' });
});

export { login, register };
