import { Router } from 'express';
import auth from '../middleware/auth-middleware';
//IMPORTING CONTROLLERS
import {
  createPost,
  getPost,
  getPosts,
  updatePost,
  deletePost,
  comment,
  like,
} from '../controllers/post-controller';

const postRouter = Router();

postRouter.post('/create-post', auth, createPost);
postRouter.patch('/update-post', auth, updatePost);
postRouter.delete('/delete-post', auth, deletePost);
postRouter.get('/get-posts', getPosts);
postRouter.get('/get-post', getPost);
postRouter.post('/like', like);
postRouter.post('/comment', comment);

export default postRouter;
