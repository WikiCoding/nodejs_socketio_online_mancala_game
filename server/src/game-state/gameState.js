const gameEngine = require("../game-engine/gameEngine");

const updateGameState = (currP1Pits, currP2Pits, currP1Score, currP2Score, clickedPitIndex, currentPlayer) => {
  const parsedClickedPitIndex = parseInt(clickedPitIndex);
  const isPlayer1 = currentPlayer === "p1";

  if (!validatePlay(isPlayer1, parsedClickedPitIndex, currP1Pits, currP2Pits))
    return { currP1Pits, currP2Pits, currP1Score, currP2Score, repeatPlay: true, gameOver: false };

  const { p1UpdatedPits, p2UpdatedPits, p1Score, p2Score, repeatPlay, gameOver } = gameEngine.play(parsedClickedPitIndex, isPlayer1, currP1Pits, currP2Pits, currP1Score, currP2Score);

  return { p1Pits: p1UpdatedPits, p2Pits: p2UpdatedPits, p1Score, p2Score, repeatPlay, isPlayer1, gameOver };
};

const validatePlay = (isPlayer1, parsedClickedPitIndex, p1Pits, p2Pits) => {
  if (isPlayer1 && p1Pits[parsedClickedPitIndex] === 0 || !isPlayer1 && p2Pits[parsedClickedPitIndex] === 0) {
    repeatPlay = true;
    return false;
  }

  return true;
}

module.exports = { updateGameState };
