import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { prisma } from './lib/prisma';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: '*' } });

io.on('connection', async (socket) => {
	console.info(`client : ${socket.id}`);
	socket.emit('connected', { message: 'connected' });
	socket.emit('tasks', await prisma.task.findMany());
});

export { httpServer, io };
