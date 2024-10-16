import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
  {
    post: {
      type: String,
    },
    postImg: {
      type: [String],
    },
    poster: {
      type: String,
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
      required: [true, 'Please provide user token'],
    },
  },
  { timestamps: true }
);

const postModel = mongoose.model('posts', postSchema);

export default postModel;
