import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
  {
    post: {
      type: String,
    },
    poster: {
      type: String,
    },
    postImg: {
      type: [String],
    },
    likes: {
      type: Number,
    },
    comments: {
      type: Array,
    },

    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'users',
      required: [true, 'You must be logged in to make a post'],
    },
  },
  { timestamps: true }
);

const postModel = mongoose.model('posts', postSchema);

export default postModel;
