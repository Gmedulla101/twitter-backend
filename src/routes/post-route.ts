import { Router } from 'express';
import auth from '../middleware/auth-middleware';
//IMPORTING CONTROLLERS
import { createPost } from '../controllers/post-controller';

const postRouter = Router();

postRouter.post('/create-post', auth, createPost);
postRouter.post('/get-posts', auth, getPosts);
