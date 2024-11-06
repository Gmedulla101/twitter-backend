import messageModel from '../models/message-model';
import convoModel from '../models/conversation-model';
import asyncHandler from 'express-async-handler';
import { ModifiedRequest } from '../middleware/auth-middleware';
import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError } from '../errors';

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
    const { username: receiverUsername } = req.params;
    const senderUsername = req.user?.username;

    const convo = await convoModel
      .findOne({ participants: { $all: [senderUsername, receiverUsername] } })
      .populate('messages');

    if (!convo) {
      throw new BadRequestError(
        'You have no conversation with this individual'
      );
    }

    res.status(StatusCodes.OK).json({ success: true, data: convo.messages });
  }
);

export { sendMessage, getMessages };
