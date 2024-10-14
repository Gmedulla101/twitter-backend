import UnauthenticatedError from '../errors/unAuth';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

interface ModifiedRequest extends Request {
  user: {
    username: string;
    email: string;
    userId: string;
  };
}

const auth = (req: ModifiedRequest, res: Response) => {
  const authHeader: string = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new UnauthenticatedError('Authetication invalid');
  }

  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {
      username: payload.username,
      email: payload.email,
      userId: payload.userId,
    };
  } catch (err) {
    console.log(err);
  }
};

export default auth;
