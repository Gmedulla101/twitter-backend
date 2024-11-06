import UnauthenticatedError from '../errors/unAuth';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { Types } from 'mongoose';

export interface ModifiedRequest extends Request {
  user?: {
    username: string;
    userId: Types.ObjectId;
  };
}

const auth = (req: ModifiedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new UnauthenticatedError('Authetication invalid');
  }

  const token = authHeader.split(' ')[1];
  try {
    if (!process.env.JWT_SECRET) {
      throw new Error('No JWT_SECRET is present');
    }
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const { username, userId }: any = payload;

    req.user = {
      username,
      userId,
    };
    next();
  } catch (err) {
    console.log(err);
  }
};

export default auth;
