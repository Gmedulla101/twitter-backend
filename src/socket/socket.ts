import { Server } from 'socket.io';
import http from 'http';
import express from 'express';

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173', 'https://twitter-clone-vmwa.vercel.app'],
    methods: ['GET', 'POST', 'PATCH', 'UPDATE', 'DELETE'],
  },
});

const userSocketMap: any = {};

export const getRecieverSocketId = (receiverUsername: string) => {
  return userSocketMap[receiverUsername];
};

io.on('connection', (socket) => {
  const user: any = socket.handshake.query.user;

  if (!user) {
    console.log('Error in getting the user from the client');
  }

  userSocketMap[user] = socket.id;

  io.emit('getOnlineUsers', Object.keys(userSocketMap));

  socket.on('disconnect', () => {
    delete userSocketMap[user];
    io.emit('getOnlineUsers', Object.keys(userSocketMap));
  });
});

export { app, io, server };
