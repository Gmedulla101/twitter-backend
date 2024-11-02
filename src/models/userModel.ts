import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Your account needs a username'],
    unique: [true, 'Username already exists'],
  },

  profileImage: {
    type: String,
    default:
      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
  },

  coverImage: {
    type: String,
    default:
      'https://i.pinimg.com/736x/5e/f9/a8/5ef9a872bcbc41da84c9ea86b16042bf.jpg',
  },

  bio: {
    type: String,
    default: "I am so cool, I don't need a bio",
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
    type: [mongoose.Schema.Types.ObjectId],
  },

  following: {
    type: [mongoose.Schema.Types.ObjectId],
  },

  password: {
    type: String,
  },
});

const userModel = mongoose.model('users', userSchema);

export default userModel;
