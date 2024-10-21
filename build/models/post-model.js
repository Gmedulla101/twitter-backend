"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const postSchema = new mongoose_1.default.Schema({
    post: {
        type: String,
    },
    poster: {
        type: String,
    },
    postImg: {
        type: [String],
    },
    likes: {
        type: Number,
    },
    comments: {
        type: Array,
    },
    createdBy: {
        type: mongoose_1.default.Types.ObjectId,
        ref: 'users',
        required: [true, 'You must be logged in to make a post'],
    },
}, { timestamps: true });
const postModel = mongoose_1.default.model('posts', postSchema);
exports.default = postModel;
