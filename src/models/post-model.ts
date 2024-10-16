import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
  {
    postContent: {
      type: String,
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
