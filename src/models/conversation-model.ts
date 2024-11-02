import mongoose from 'mongoose';

const ConvoSchema = new mongoose.Schema(
  {
    participants: [String],
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'messages',
        default: [],
      },
    ],
  },
  { timestamps: true }
);

const convoModel = mongoose.model('convos', ConvoSchema);

export default convoModel;
