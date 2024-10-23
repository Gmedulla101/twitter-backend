import userModel from '../models/userModel';
import { StatusCodes } from 'http-status-codes';
import asyncHandler from 'express-async-handler';
import { Response } from 'express';
import { ModifiedRequest } from '../middleware/auth-middleware';
import { BadRequestError } from '../errors';

const getUsers = asyncHandler(async (req: ModifiedRequest, res: Response) => {
  const { user } = req.query;

  if (user) {
    return;
  }

  //GET ALL USERS
  const users = await userModel.find({});

  //FILTER OUT REQUIRED USER
  const validUsers = users.filter((user) => {
    return user.username
      .toLowerCase()
      .startsWith(String(req.query.user).toLowerCase());
  });

  //RETURN FILTERED USERS
  res.status(StatusCodes.OK).json({ success: true, data: validUsers });
});

const getUser = asyncHandler(async (req: ModifiedRequest, res: Response) => {
  const { username } = req.params;
  if (!username) {
    throw new BadRequestError(
      'Specified user does not exist, please check the user ID'
    );
  }

  const user = await userModel.find({ username });
  if (!user) {
    throw new BadRequestError(
      'Specified user does not exist, please check the user ID'
    );
  }

  res.status(StatusCodes.OK).json({ success: true, data: user });
});

const followUser = asyncHandler(async (req: ModifiedRequest, res: Response) => {
  res.status(StatusCodes.OK).json({ success: true, data: 'Followed' });
});

const unFollowUser = asyncHandler(
  async (req: ModifiedRequest, res: Response) => {
    res.status(StatusCodes.OK).json({ success: true, data: 'Unfollowed' });
  }
);

export { getUsers, getUser, followUser, unFollowUser };
