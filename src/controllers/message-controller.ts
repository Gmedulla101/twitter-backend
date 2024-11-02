import messageModel from '../models/message-model';
import convoModel from '../models/conversation-model';
import asyncHandler from 'express-async-handler';
import { ModifiedRequest } from '../middleware/auth-middleware';
import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const sendMessage = asyncHandler(
  async (req: ModifiedRequest, res: Response) => {
    const { message } = req.body;
    const { username: receiverUsername } = req.params;
    const senderUsername = req.user?.username;

    let convo = await convoModel.findOne({
      participants: { $all: [senderUsername, receiverUsername] },
    });

    if (!convo) {
      await convoModel.create({
        participants: [senderUsername, receiverUsername],
      });
    }

    const newMessage = await messageModel.create({
      senderUsername,
      receiverUsername,
      message,
    });

    if (newMessage) {
      convo?.messages.push(newMessage._id);
    }

    await convo?.save();

    res.status(StatusCodes.OK).json({ success: true, msg: newMessage });
  }
);

const getMessages = asyncHandler(
  async (req: ModifiedRequest, res: Response) => {
    res
      .status(StatusCodes.OK)
      .json({ success: true, data: 'retrirved messages' });
  }
);

export { sendMessage, getMessages };
