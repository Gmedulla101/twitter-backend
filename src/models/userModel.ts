import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please provide a username'],
    unique: [true, 'Username already exists'],
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

const userModel = mongoose.model('users', UserSchema);

export default userModel;
