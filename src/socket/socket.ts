import { Server } from 'socket.io';
import http from 'http';
import express from 'express';

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST', 'PATCH', 'UPDATE', 'DELETE'],
  },
});

io.on('connection', (socket) => {
  console.log(`User with id ${socket.id} has connected`);

  socket.on('disconnect', () => {
    console.log('disconnected');
  });
});

export { app, io, server };
