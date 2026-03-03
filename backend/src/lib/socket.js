const { Server } = require("socket.io");
const http = require("http");
const express = require("express");
const { socketAuthMiddleware } = require("../middleware/socketAuthMiddleware.js");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    credentials: true
  },

});

io.use(socketAuthMiddleware);


function getReceiverSocketId(userId){
  return userSocketMap[userId];
} 



//storing online user
const userSocketMap = {};
io.on("connection", (socket) => {
  console.log("A user connected", socket.user.fullName);
  const userId = socket.userId;
  userSocketMap[userId] = socket.id;
  io.emit("getOnlineUsers", Object.keys(userSocketMap));
  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.user.fullName);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  })
})
module.exports = { io, server, app, getReceiverSocketId }