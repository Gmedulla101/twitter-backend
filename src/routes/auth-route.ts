import express from 'express';

//IMPORTING CONTROLLERS
import { login, register } from '../controllers/auth-controller';

const authRouter = express.Router();

authRouter.post('/login', login);
authRouter.post('/register', register);

export default authRouter;
