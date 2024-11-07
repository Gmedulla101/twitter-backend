import postModel from '../models/post-model';
import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import { ModifiedRequest } from '../middleware/auth-middleware';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, UnauthenticatedError } from '../errors';
import { Types } from 'mongoose';

const createPost = asyncHandler(async (req: ModifiedRequest, res: Response) => {
  console.log(req.user);
  if (!req?.user?.userId) {
    throw new UnauthenticatedError('Please log in to make a post');
  }

  const newPost = await postModel.create({
    ...req.body,
    createdBy: req.user.userId,
  });

  res.status(StatusCodes.OK).json({ success: true, msg: 'Post created' });
});

const getPosts = asyncHandler(async (req: ModifiedRequest, res: Response) => {
  const { poster } = req.query;

  let queryObject: any = {};

  if (poster) {
    queryObject.poster = poster;
  }

  const data = await postModel.find(queryObject).sort({ createdAt: -1 });
  res.status(StatusCodes.OK).json({ success: true, data });
});

const getUserPosts = asyncHandler(
  async (req: ModifiedRequest, res: Response) => {
    const data = await postModel
      .find({ createdBy: req.user?.userId })
      .sort({ createdAt: -1 });
    res.status(StatusCodes.OK).json({ success: true, data });
  }
);

const getPost = asyncHandler(async (req: ModifiedRequest, res: Response) => {
  const { id } = req.params;
  if (!id) {
    throw new BadRequestError('Absent post Id');
  }
  const post = await postModel.findOne({ _id: id });

  if (!post) {
    throw new BadRequestError('The post does not exist');
  }
  res.status(StatusCodes.OK).json({ success: true, data: post });
});

const deletePost = asyncHandler(async (req: ModifiedRequest, res: Response) => {
  res.status(StatusCodes.OK).json({ success: true, msg: 'Post deleted' });
});

const updatePost = asyncHandler(async (req: ModifiedRequest, res: Response) => {
  res.status(StatusCodes.OK).json({ success: true, msg: 'Post updated' });
});

const comment = asyncHandler(async (req: ModifiedRequest, res: Response) => {
  const { id: postId } = req.params;
  const { comment, commenter } = req.body;

  if (!comment) {
    throw new BadRequestError("You can't comment an empty field");
  }

  const post = await postModel.findOne({ _id: postId });
  if (!post) {
    throw new BadRequestError('The specified tweet does not exist');
  }

  post.comments.unshift({ comment, commenter });

  post.save();

  res.status(StatusCodes.OK).json({ success: true, data: post });
});

const like = asyncHandler(async (req: ModifiedRequest, res: Response) => {
  const { id: postId } = req.params;
  const likedUser: any = req.query.likedUser;

  const particularPost = await postModel.findOne({ _id: postId });

  if (!particularPost) {
    throw new BadRequestError('This post no longer exists');
  }

  if (particularPost.likers.includes(likedUser)) {
    throw new BadRequestError('You have already liked this post');
  }

  particularPost.likes = particularPost?.likes + 1;
  particularPost.likers.unshift(likedUser);
  particularPost.save();

  res.status(StatusCodes.OK).json({ success: true, data: particularPost });
});

export {
  createPost,
  getPost,
  getUserPosts,
  getPosts,
  updatePost,
  deletePost,
  comment,
  like,
};
