"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const unAuth_1 = __importDefault(require("../errors/unAuth"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        throw new unAuth_1.default('Authetication invalid');
    }
    const token = authHeader.split(' ')[1];
    try {
        if (!process.env.JWT_SECRET) {
            throw new Error('No JWT_SECRET is present');
        }
        const payload = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const { username, userId } = payload;
        req.user = {
            username,
            userId,
        };
        next();
    }
    catch (err) {
        console.log(err);
    }
};
exports.default = auth;
