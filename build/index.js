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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
//IMPORTING ERRORS
const notFound_1 = __importDefault(require("./middleware/notFound"));
const errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
//IMPORTING HELPER FUNCTIONS
const connectDB_1 = __importDefault(require("./connectDB/connectDB"));
//IMPORTING ROUTES
const auth_route_1 = __importDefault(require("./routes/auth-route"));
const post_route_1 = __importDefault(require("./routes/post-route"));
//INITALISING APP
const app = (0, express_1.default)();
dotenv_1.default.config();
//UTILISING MIDLEWARE
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
//ROUTES
app.use('/api/v1/auth', auth_route_1.default);
app.use('/api/v1/posts', post_route_1.default);
app.use(errorHandler_1.default);
app.use(notFound_1.default);
const PORT = process.env.PORT || 5000;
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    if (!process.env.MONGO_URI) {
        throw new Error('No database connection string');
    }
    yield (0, connectDB_1.default)(process.env.MONGO_URI);
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}...`);
    });
});
start();
