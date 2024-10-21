"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.like = exports.comment = exports.deletePost = exports.updatePost = exports.getPosts = exports.getPost = exports.createPost = void 0;
const post_model_1 = __importDefault(require("../models/post-model"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const http_status_codes_1 = require("http-status-codes");
const errors_1 = require("../errors");
const createPost = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    console.log(req.user);
    if (!((_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.userId)) {
        throw new errors_1.UnauthenticatedError('Please log in to make a post');
    }
    const newPost = yield post_model_1.default.create(Object.assign(Object.assign({}, req.body), { createdBy: req.user.userId }));
    console.log(newPost);
    res.status(http_status_codes_1.StatusCodes.OK).json({ success: true, msg: 'Post created' });
}));
exports.createPost = createPost;
const getPosts = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(http_status_codes_1.StatusCodes.OK).json({ success: true, msg: 'Posts retrieved' });
}));
exports.getPosts = getPosts;
const getPost = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(http_status_codes_1.StatusCodes.OK).json({ success: true, msg: 'Post retrieved' });
}));
exports.getPost = getPost;
const deletePost = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(http_status_codes_1.StatusCodes.OK).json({ success: true, msg: 'Post deleted' });
}));
exports.deletePost = deletePost;
const updatePost = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(http_status_codes_1.StatusCodes.OK).json({ success: true, msg: 'Post updated' });
}));
exports.updatePost = updatePost;
const comment = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(http_status_codes_1.StatusCodes.OK).json({ success: true, msg: 'Reply sent' });
}));
exports.comment = comment;
const like = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(http_status_codes_1.StatusCodes.OK).json({ success: true, msg: 'Like sent' });
}));
exports.like = like;
