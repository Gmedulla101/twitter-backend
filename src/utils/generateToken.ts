import jwt from 'jsonwebtoken';

type TokenVariables = {
  userId: string;
  username: string;
};

const generateToken = ({ userId, username }: TokenVariables) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is undefined');
  }

  const token = jwt.sign({ userId, username }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
  return token;
};

export default generateToken;
