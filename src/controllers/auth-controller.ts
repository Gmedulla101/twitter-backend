import { BadRequestError, UnauthenticatedError } from '../errors';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import userModel from '../models/userModel';
import bcrypt from 'bcryptjs';

//IMPORTING HELPER FUNCTIONS
import generateToken from '../utils/generateToken';

const register = asyncHandler(async (req: Request, res: Response) => {
  const { username, email, password, firstName, lastName, otherNames } =
    req.body;

  console.log(req.body);

  if (!username || !email || !password) {
    throw new BadRequestError('Please enter complete sign up details');
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
    firstName,
    lastName,
    otherNames,
  });

  const tokenVar = {
    id: String(newUser._id),
    username: newUser.username,
  };
  const newToken = generateToken(tokenVar);

  res
    .status(StatusCodes.OK)
    .json({ success: true, data: newToken, username: newUser.username });
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

  const tokenVar = {
    id: String(user._id),
    username: user.username,
  };
  const token = generateToken(tokenVar);

  res
    .status(StatusCodes.OK)
    .json({ success: true, token: token, username: user.username });
});

export { login, register };
