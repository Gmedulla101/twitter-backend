import { Router } from 'express';
import {
  getUsers,
  getUser,
  followUser,
  unFollowUser,
} from '../controllers/user-controller';

const userRouter = Router();

userRouter.get('/getUsers', getUsers);
userRouter.get('/getUser/:username', getUser);
userRouter.patch('/followUser/:id', followUser);
userRouter.patch('/getUsers/:id', unFollowUser);

export default userRouter;
