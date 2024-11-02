import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema(
  {
    senderUsername: {
      type: String,
      required: true,
    },
    receiverUsername: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const messageModel = mongoose.model('messages', MessageSchema);

export default messageModel;
