import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
    requireed: [true, 'Please provide an email'],
  },
  password: {
    type: String,
    required: [true, 'Operation cannot proceed without password'],
  },
});

UserSchema.methods.createJWT = function (payload) {
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '30d' });
  return token;
};

const userModel = mongoose.model('users', UserSchema);
export default userModel;
