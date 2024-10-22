import userModel from '../models/userModel';
import { StatusCodes } from 'http-status-codes';
import asyncHandler from 'express-async-handler';
import { Response } from 'express';
import { ModifiedRequest } from '../middleware/auth-middleware';

const getUsers = asyncHandler(async (req: ModifiedRequest, res: Response) => {
  const users = await userModel.find({});
  const validUsers = users.filter((user) => {
    return user.username
      .toLowerCase()
      .startsWith(String(req.query.user).toLocaleLowerCase());
  });
  res.status(StatusCodes.OK).json({ success: true, data: validUsers });
});

export { getUsers };
