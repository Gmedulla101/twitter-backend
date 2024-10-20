import postModel from '../models/post-model';
import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import { ModifiedRequest } from '../middleware/auth-middleware';
import { StatusCodes } from 'http-status-codes';
import { UnauthenticatedError } from '../errors';

const createPost = asyncHandler(async (req: ModifiedRequest, res: Response) => {
  console.log(req.user);
  if (!req?.user?.userId) {
    throw new UnauthenticatedError('Please log in to make a post');
  }

  const newPost = await postModel.create({
    ...req.body,
    createdBy: req.user.userId,
  });
  console.log(newPost);
  res.status(StatusCodes.OK).json({ success: true, msg: 'Post created' });
});

const getPosts = asyncHandler(async (req: ModifiedRequest, res: Response) => {
  res.status(StatusCodes.OK).json({ success: true, msg: 'Posts retrieved' });
});

const getPost = asyncHandler(async (req: ModifiedRequest, res: Response) => {
  res.status(StatusCodes.OK).json({ success: true, msg: 'Post retrieved' });
});

const deletePost = asyncHandler(async (req: ModifiedRequest, res: Response) => {
  res.status(StatusCodes.OK).json({ success: true, msg: 'Post deleted' });
});

const updatePost = asyncHandler(async (req: ModifiedRequest, res: Response) => {
  res.status(StatusCodes.OK).json({ success: true, msg: 'Post updated' });
});

const comment = asyncHandler(async (req: ModifiedRequest, res: Response) => {
  res.status(StatusCodes.OK).json({ success: true, msg: 'Reply sent' });
});

const like = asyncHandler(async (req: ModifiedRequest, res: Response) => {
  res.status(StatusCodes.OK).json({ success: true, msg: 'Like sent' });
});

export { createPost, getPost, getPosts, updatePost, deletePost, comment, like };
