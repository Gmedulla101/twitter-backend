import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Your account needs a username'],
    unique: [true, 'Username already exists'],
  },
  profileImage: {
    type: String,
  },
  coverImage: {
    type: String,
  },
  bio: {
    type: String,
  },
  email: {
    type: String,
    required: [true, 'Please input your email'],
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  otherNames: {
    type: String,
  },
  followers: {
    type: [String],
  },
  following: {
    type: [String],
  },
  password: {
    type: String,
  },
});

const userModel = mongoose.model('users', userSchema);

export default userModel;
