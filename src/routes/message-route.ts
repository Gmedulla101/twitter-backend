import { Router } from 'express';
import auth from '../middleware/auth-middleware';

const messageRouter = Router();

//IMPORTING CONTROLLERS
import { sendMessage, getMessages } from '../controllers/message-controller';

messageRouter.post('/send/:username', auth, sendMessage);
messageRouter.get('/getMessages/:username', auth, getMessages);

export default messageRouter;
