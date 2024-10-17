import postModel from '../models/post-model';
import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import { ModifiedRequest } from '../middleware/auth-middleware';
import { StatusCodes } from 'http-status-codes';

const createPost = asyncHandler(async (req: ModifiedRequest, res: Response) => {
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

export { createPost };
