import { PrismaClient } from "@prisma/client";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: "*" } });

const prisma = new PrismaClient();
io.on("connection", async (socket) => {
  console.info(`client : ${socket.id}`);
  socket.emit("connected", { message: "connected" });
  socket.emit("tasks", await prisma.task.findMany());
});

export { httpServer, io };
