import { BadRequestError, UnauthenticatedError } from '../errors';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import userModel from '../models/userModel';
import bcrypt from 'bcryptjs';

//IMPORTING HELPER FUNCTIONS
import generateToken from '../utils/generateToken';

const register = asyncHandler(async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    throw new BadRequestError('Please enter complete sing up details');
  }

  //CHECKING IF USER ALREADY EXISTS
  const oldUser = await userModel.findOne({ email });

  if (oldUser) {
    throw new BadRequestError('User already exists');
  }

  //HASHING PASSWORD
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //CREATING USER
  const newUser = await userModel.create({
    username,
    email,
    password: hashedPassword,
  });

  const newToken = generateToken(newUser._id.toString());

  res.status(StatusCodes.OK).json({ success: true, token: newToken });
});

const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError('Please put in the complete sign in details');
  }

  //CHECKING TO SEE IF THE USER EXISTS
  const user = await userModel.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError('The requested user does not exist');
  }

  const token = generateToken(user._id.toString());

  res.status(StatusCodes.OK).json({ success: true, token: token });
});

export { login, register };
