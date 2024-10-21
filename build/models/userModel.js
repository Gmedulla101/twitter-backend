"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: [true, 'Your account needs a username'],
        unique: [true, 'Username already exists'],
    },
    email: {
        type: String,
        required: [true, 'Please input your email'],
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    otherNames: {
        type: String,
    },
    password: {
        type: String,
    },
});
const userModel = mongoose_1.default.model('users', userSchema);
exports.default = userModel;
