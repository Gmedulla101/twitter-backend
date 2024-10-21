"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = __importDefault(require("../middleware/auth-middleware"));
//IMPORTING CONTROLLERS
const post_controller_1 = require("../controllers/post-controller");
const postRouter = (0, express_1.Router)();
postRouter.post('/create-post', auth_middleware_1.default, post_controller_1.createPost);
postRouter.patch('/update-post', auth_middleware_1.default, post_controller_1.updatePost);
postRouter.delete('/delete-post', auth_middleware_1.default, post_controller_1.deletePost);
postRouter.get('/get-posts', post_controller_1.getPosts);
postRouter.get('/get-post', post_controller_1.getPost);
postRouter.post('/like', post_controller_1.like);
postRouter.post('/comment', post_controller_1.comment);
exports.default = postRouter;
