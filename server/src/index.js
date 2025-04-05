const path = require('path');
const clientDirPath = path.join(__dirname, '../../client');
const express = require("express");
const app = express();
const http = require('http');
const server = http.createServer(app);
const cors = require("cors");
const socketio = require('socket.io');
const io = socketio(server);
const gameState = require("./game-state/gameState");

app.use(express.json());
app.use(cors());
app.use(express.static(clientDirPath));

let connectedUsers = [];
let userNames = [];

io.on("connection", (socket) => {
  console.log("New client connected ", socket.id);
  connectedUsers.push(socket.id);
  console.log("Currently connected users ", connectedUsers);

  socket.on("player-selection", (pitIndex, currentGameState) => {
    const { p1PitsState, p2PitsState, p1ScoreState, p2ScoreState } = currentGameState;

    const newGameState = gameState.updateGameState(p1PitsState, p2PitsState, p1ScoreState, p2ScoreState, pitIndex.split("-")[1],
      pitIndex.split("-")[0]);

    console.log("New game state: ", newGameState);

    io.emit("game-state-update", newGameState);
  });

  socket.on("set-player-name", (username) => {
    userNames.push({ socketId: socket.id, username });
  });

  socket.on("chat-message", (message) => {
    io.emit("chat-message",
      { message, socketId: socket.id, user: userNames.filter(users => users.socketId === socket.id) });
  });

  socket.on("disconnect", () => {
    connectedUsers = connectedUsers.filter(socketId => socketId !== socket.id);
    console.log("Client disconnected ", socket.id);
    console.log("Currently connected users ", connectedUsers);
  });
});

server.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
