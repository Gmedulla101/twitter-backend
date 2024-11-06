import userModel from '../models/userModel';
import { StatusCodes } from 'http-status-codes';
import asyncHandler from 'express-async-handler';
import { Response } from 'express';
import { ModifiedRequest } from '../middleware/auth-middleware';
import { BadRequestError, UnauthenticatedError } from '../errors';
import { Types } from 'mongoose';

//GET USERS FUNCTION
const getUsers = asyncHandler(async (req: ModifiedRequest, res: Response) => {
  const { user } = req.query;
  const loggedInUserId = req.user?.userId;

  if (!user) {
    throw new BadRequestError('There was no specified user');
  }

  //GET ALL USERS
  const users = await userModel
    .find({ _id: { $ne: loggedInUserId } })
    .select('-password');

  //FILTER OUT REQUIRED USER
  const validUsers = users.filter((user) => {
    return user.username
      .toLowerCase()
      .startsWith(String(req.query.user).toLowerCase());
  });

  //RETURN FILTERED USERS
  res.status(StatusCodes.OK).json({ success: true, data: validUsers });
});

//GET USER BASED ON USERNAME
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

//FOLLOW USER FUNCTION
const followUser = asyncHandler(async (req: ModifiedRequest, res: Response) => {
  const { username } = req.params;
  const userId: Types.ObjectId | undefined = req.user?.userId;

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

  //CHECKING TO SEE IF THE LOGGED IN USER ALREADY FOLLOWS THE USER TO BE FOLOWED
  if (userToBeFollowed.followers.includes(userId)) {
    throw new BadRequestError('You already follow this user');
  }

  userToBeFollowed.followers.push(userId);
  followingUser.following.push(userToBeFollowed._id);

  await Promise.all([userToBeFollowed.save(), followingUser.save()]);

  res
    .status(StatusCodes.OK)
    .json({ success: true, data: 'Followed', followedUser: userToBeFollowed });
});

//UNFOLLOW USER FUNCTION
const unFollowUser = asyncHandler(
  async (req: ModifiedRequest, res: Response) => {
    const { username } = req.params;
    const userId: Types.ObjectId | undefined = req.user?.userId;

    if (!userId) {
      throw new UnauthenticatedError(
        `You must be logged in to unfollow ${username}`
      );
    }

    let userToBeUnfollowed = await userModel.findOne({ username });
    let unfollowingUser = await userModel.findOne({ _id: userId });

    if (!userToBeUnfollowed) {
      throw new BadRequestError('The requested user does not exist');
    }

    if (!unfollowingUser) {
      throw new BadRequestError("You don't exist lol");
    }

    //CHECKING TO SEE IF THE LOGGED IN USER ALREADY FOLLOWS THE USER TO BE FOLOWED
    if (!userToBeUnfollowed.followers.includes(userId)) {
      throw new BadRequestError('You already unfollowed this user');
    }

    const userToUnfollowPosition = userToBeUnfollowed.followers.indexOf(userId);

    const unfollowingUserPosition = unfollowingUser.following.indexOf(
      userToBeUnfollowed._id
    );

    userToBeUnfollowed.followers.splice(userToUnfollowPosition, 1);
    unfollowingUser.following.splice(unfollowingUserPosition, 1);

    await Promise.all([userToBeUnfollowed.save(), unfollowingUser.save()]);

    res.status(StatusCodes.OK).json({
      success: true,
      data: 'Followed',
      unfollowedUser: userToBeUnfollowed,
    });
  }
);

export { getUsers, getUser, followUser, unFollowUser };
