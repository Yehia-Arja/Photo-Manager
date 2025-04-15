const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const mysql = require("mysql2");

// Setup
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", 
  }
});

// MySQL connection
const db = mysql.createConnection({
	host: "database",
	user: "root",
	password: "1234",
	database: "photo_manager"
});

db.connect((err) => {
	if (err) {
		console.error("MySQL error:", err);
		return;
	}
  	console.log("✅ Connected to MySQL!");
});

// Socket logic
io.on("connection", (socket) => {
	console.log("User connected");

	socket.on("chat message", (data) => {
		const { username, message } = data;

		// Broadcast to all clients
		io.emit("chat message", data);

		// Save to DB
		const sql = "INSERT INTO chat_messages (username, message) VALUES (?, ?)";
		db.query(sql, [username, message], (err) => {
		if (err) console.error("DB insert error:", err);
		});
 	});

	socket.on("disconnect", () => {
		console.log("User disconnected");
	});
});

// Start server
server.listen(3000, () => {
  	console.log("Chat server listening on port 3000");
});
