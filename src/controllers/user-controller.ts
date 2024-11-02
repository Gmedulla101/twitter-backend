import userModel from '../models/userModel';
import { StatusCodes } from 'http-status-codes';
import asyncHandler from 'express-async-handler';
import { Response } from 'express';
import { ModifiedRequest } from '../middleware/auth-middleware';
import { BadRequestError, UnauthenticatedError } from '../errors';

const getUsers = asyncHandler(async (req: ModifiedRequest, res: Response) => {
  const { user } = req.query;

  if (!user) {
    throw new BadRequestError('There was no specified user');
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
  const { username } = req.params;
  const userId: any = req.user?.userId;

  if (!userId) {
    throw new UnauthenticatedError(
      `You must be logged in to follow ${username}`
    );
  }

  let userToBeFollowed = await userModel.findOne({ username });
  let followingUser = await userModel.findOne({ _id: userId });

  if (!userToBeFollowed) {
    throw new BadRequestError('The requested user does not exist');
  }

  if (!followingUser) {
    throw new BadRequestError("You don't exist lol");
  }

  userToBeFollowed.followers.map((follower, i) => {
    if (follower === userId) {
      throw new BadRequestError('You already follow this user');
    }
  });

  userToBeFollowed.followers.push(userId);
  followingUser.following.push(userToBeFollowed._id);

  await Promise.all([userToBeFollowed.save(), followingUser.save()]);

  res
    .status(StatusCodes.OK)
    .json({ success: true, data: 'Followed', followedUser: userToBeFollowed });
});

const unFollowUser = asyncHandler(
  async (req: ModifiedRequest, res: Response) => {
    res.status(StatusCodes.OK).json({ success: true, data: 'Unfollowed' });
  }
);

export { getUsers, getUser, followUser, unFollowUser };
