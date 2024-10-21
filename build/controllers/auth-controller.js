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
exports.register = exports.login = void 0;
const errors_1 = require("../errors");
const http_status_codes_1 = require("http-status-codes");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const userModel_1 = __importDefault(require("../models/userModel"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
//IMPORTING HELPER FUNCTIONS
const generateToken_1 = __importDefault(require("../utils/generateToken"));
const register = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password, firstName, lastName, otherNames } = req.body;
    console.log(req.body);
    if (!username || !email || !password) {
        throw new errors_1.BadRequestError('Please enter complete sign up details');
    }
    //CHECKING IF USER ALREADY EXISTS
    const oldUser = yield userModel_1.default.findOne({ email });
    if (oldUser) {
        throw new errors_1.BadRequestError('User already exists');
    }
    //HASHING PASSWORD
    const salt = yield bcryptjs_1.default.genSalt(10);
    const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
    //CREATING USER
    const newUser = yield userModel_1.default.create({
        username,
        email,
        password: hashedPassword,
        firstName,
        lastName,
        otherNames,
    });
    const tokenVar = {
        userId: String(newUser._id),
        username: newUser.username,
    };
    const newToken = (0, generateToken_1.default)(tokenVar);
    res
        .status(http_status_codes_1.StatusCodes.OK)
        .json({ success: true, data: newToken, username: newUser.username });
}));
exports.register = register;
const login = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new errors_1.BadRequestError('Please put in the complete sign in details');
    }
    //CHECKING TO SEE IF THE USER EXISTS
    const user = yield userModel_1.default.findOne({ email });
    if (!user) {
        throw new errors_1.UnauthenticatedError('The requested user does not exist');
    }
    const tokenVar = {
        userId: String(user._id),
        username: user.username,
    };
    const token = (0, generateToken_1.default)(tokenVar);
    res
        .status(http_status_codes_1.StatusCodes.OK)
        .json({ success: true, token: token, username: user.username });
}));
exports.login = login;
