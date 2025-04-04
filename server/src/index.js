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

io.on("connection", (socket) => {
  console.log("New client connected ", socket.id);

  socket.on("player-selection", (pitIndex, currentGameState) => {
    const { p1PitsState, p2PitsState, p1ScoreState, p2ScoreState } = currentGameState;

    const newGameState = gameState.updateGameState(p1PitsState, p2PitsState, p1ScoreState, p2ScoreState, pitIndex.split("-")[1],
      pitIndex.split("-")[0]);

    console.log("New game state: ", newGameState);

    io.emit("game-state-update", newGameState);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected ", socket.id);
  });
});

server.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
