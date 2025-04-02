const gameRules = require('../game-rules/gameRules');
let repeatPlay = false;
let p1Pits = [];
let p2Pits = [];
let p1Score = 0;
let p2Score = 0;

const play = (clickedPitIndex, isPlayer1, p1PitsCurrent, p2PitsCurrent, p1CurrentScore, p2CurrentScore) => {
  p1Pits = p1PitsCurrent;
  p2Pits = p2PitsCurrent;
  p1Score = p1CurrentScore;
  p2Score = p2CurrentScore;
  let gameOver = false;

  const valueSelected = isPlayer1 ? p1Pits[clickedPitIndex] : p2Pits[clickedPitIndex];

  // TODO: in fact, this is not fully ok because it will replace the pits vector but then it gets updated on top of this creating the bug. Neither should be returning updated things...
  const { p1UpdatedPits, p2UpdatedPits, currentP1Score, currentP2Score, valueSelectedUpdated } = gameRules.checkStealValueRule(p1Pits, p2Pits, isPlayer1, valueSelected, clickedPitIndex, p1Score, p2Score);

  p1Pits = p1UpdatedPits;
  p2Pits = p2UpdatedPits;
  p1Score = currentP1Score;
  p2Score = currentP2Score;

  handleTurn(valueSelectedUpdated, clickedPitIndex, isPlayer1);

  gameRules.checkGameOver(p1Pits, p2Pits) ? gameOver = true : gameOver = false;

  return { p1UpdatedPits: p1Pits, p2UpdatedPits: p2Pits, p1Score, p2Score, repeatPlay, gameOver };
}

const handleTurn = (valueSelected, clickedPitIndex, isPlayer1) => {
  gameRules.checkRepeatPlayRule(clickedPitIndex, valueSelected, isPlayer1);

  const currentGameStateVector = buildCurrentGameStateVector(p1Pits, p1Score, p2Pits, p2Score);

  const convertedPitIndex = convertSelectedPitIndex(clickedPitIndex, isPlayer1);

  currentGameStateVector[convertedPitIndex] = 0;

  for (i = valueSelected, j = convertedPitIndex + 1; i > 0; i--) {
    currentGameStateVector[j]++;
    j++;
    if (j === 14) j = 0;
  }

  p1Pits = currentGameStateVector.slice(0, 6).reverse();
  p2Pits = currentGameStateVector.slice(7, 13)
  p1Score = currentGameStateVector[6];
  p2Score = currentGameStateVector[13];
}

const convertSelectedPitIndex = (clickedPitIndex, isPlayer1) => {
  // player1 is like this conversion due to array being reversed
  return isPlayer1 ? p1Pits.length - 1 - clickedPitIndex : clickedPitIndex + 7;
}

const buildCurrentGameStateVector = (p1Pits, p1Score, p2Pits, p2Score) => {
  return [...p1Pits.reverse(), p1Score, ...p2Pits, p2Score];
}

module.exports = { play };