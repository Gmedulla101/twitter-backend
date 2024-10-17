import jwt from 'jsonwebtoken';

type TokenVariables = {
  id: string;
  username: string;
};

const generateToken = ({ id, username }: TokenVariables) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is undefined');
  }

  const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
  return token;
};

export default generateToken;
