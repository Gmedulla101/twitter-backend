import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import asyncHandler from 'express-async-handler';
import userModel from '../models/userModel';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

//IMPORTING ERRORS
import BadRequestError from '../errors/badRequest';
import UnauthenticatedError from '../errors/unAuth';
import { error } from 'console';

//CONTROLLERS
const register = asyncHandler(async (req: Request, res: Response, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    throw new BadRequestError('Please enter complete login details');
  }

  //CHECKING TO SEE IF THE USER ALREADY EXISTS
  const oldUser = await userModel.findOne({ email });
  if (oldUser) {
    throw new BadRequestError('User already exists');
  }

  //CHECKING TO SEE IF THE USERNAME IS TAKEN
  const takenUsername = await userModel.findOne({ username });
  if (takenUsername) {
    throw new BadRequestError('Username is already taken');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await userModel.create({
    username,
    email,
    password: hashedPassword,
  });

  const token = jwt.sign(
    {
      userId: user._id,
      email: user.email,
      username: user.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: '30d' }
  );

  res.status(StatusCodes.OK).json({
    success: true,
    username: user.username,
    email: user.email,
    id: user._id,
    token,
  });
});

//LOGIN
const login = asyncHandler(async (req: Request, res: Response) => {
  const { username, password, email } = req.body;
  if (!username || !password) {
    throw new BadRequestError('Incomplete login details');
  }

  res.status(StatusCodes.OK).json({ success: true, msg: 'User logged in' });
});

export { login, register };
