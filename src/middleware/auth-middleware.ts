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
  const authHeader: string | undefined = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new UnauthenticatedError('Authetication invalid');
  }

  const token = authHeader.split(' ')[1];
  try {
    if (!process.env.JWT_SECRET) {
      throw new Error('No JWT_SECRET is present');
    }
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const { username, email, userId }: any = payload;

    req.user = {
      username,
      email,
      userId,
    };
  } catch (err) {
    console.log(err);
  }
};

export default auth;
