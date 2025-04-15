const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const { Sequelize, DataTypes } = require("sequelize");
const path = require("path");

// Setup Express + HTTP + Socket.IO
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", 
  },
});

// Sequelize (MySQL ORM) setup
const sequelize = new Sequelize("photo_manager", "root", "1234", {
  host: "database", 
  dialect: "mysql",
});

// Load Message model
const Message = require(path.join(__dirname, "models", "Message"))(
  sequelize,
  DataTypes
);

// Test DB connection and sync
sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to MySQL with Sequelize!");
    return sequelize.sync();
  })
  .then(() => {
    console.log("✅ Models synced!");
  })
  .catch((err) => {
    console.error("Sequelize error:", err);
  });

// WebSocket logic
io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("chat message", async (data) => {
    const { username, message } = data;

    // Broadcast message to all connected clients
    io.emit("chat message", data);

    // Save message to DB
    try {
      await Message.create({ username, message });
    } catch (err) {
      console.error("Error saving message:", err);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// Start server
server.listen(3000, () => {
  console.log("Chat server listening on port 3000");
});
