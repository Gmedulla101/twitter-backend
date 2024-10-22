import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Your account needs a username'],
    unique: [true, 'Username already exists'],
  },
  profilePic: {
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
  password: {
    type: String,
  },
});

const userModel = mongoose.model('users', userSchema);

export default userModel;
