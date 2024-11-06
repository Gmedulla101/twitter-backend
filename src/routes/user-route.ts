import { Router } from 'express';
import {
  getUsers,
  getUser,
  followUser,
  unFollowUser,
} from '../controllers/user-controller';
import auth from '../middleware/auth-middleware';

const userRouter = Router();

userRouter.get('/getUsers', auth, getUsers);
userRouter.get('/getUser/:username', getUser);
userRouter.patch('/followUser/:username', auth, followUser);
userRouter.patch('/unfollowUser/:username', auth, unFollowUser);

export default userRouter;
