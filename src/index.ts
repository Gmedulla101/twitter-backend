import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';

//IMPORTING ERRORS
import notFound from './middleware/notFound';
import errorHandler from './middleware/errorHandler';

//IMPORTING HELPER FUNCTIONS
import connectDB from './connectDB/connectDB';

//IMPORTING ROUTES
import authRouter from './routes/auth-route';
import postRouter from './routes/post-route';
import userRouter from './routes/user-route';
import messageRouter from './routes/message-route';
import convoRouter from './routes/convo-route';

//INITALISING APP
const app = express();
dotenv.config();

//INSTANTIATING SOCKET
const appServer = http.createServer(app);
const io = new Server(appServer, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  //FUNCTIONALITY TO CREATE AND JOIN ROOM
  socket.on('join_room', (data) => {
    socket.join(data);
    console.log(`User with ID ${socket.id} has joined room ${data}`);
  });

  //FUNCTIONALITY TO SEND MESSAGE
  socket.on('send_message', (data) => {
    console.log(data);
    socket.to(data.room).emit('receive_message', data);
  });

  //DISCONNECTION
  socket.on('disconnect', () => {
    console.log('Disconnected');
  });
});

//UTILISING MIDLEWARE
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

//ROUTES
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/posts', postRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/messages', messageRouter);
app.use('/api/v1/convo', convoRouter);

app.use(errorHandler);
app.use(notFound);

const PORT = process.env.PORT || 5000;

const start = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error('No database connection string');
  }
  await connectDB(process.env.MONGO_URI);
  appServer.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}...`);
  });
};

start();
