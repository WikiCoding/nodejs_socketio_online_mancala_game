const gameRules = require("../game-rules/gameRules");

let p1Pits = [];
let p2Pits = [];
let p1Score = 0;
let p2Score = 0;
let repeatPlay = false;
let gameOver = false;

const updateGameState = (currP1Pits, currP2Pits, currP1Score, currP2Score, clickedPitIndex, currentPlayer) => {
  p1Pits = currP1Pits;
  p2Pits = currP2Pits;
  p1Score = currP1Score;
  p2Score = currP2Score;
  const parsedClickedPitIndex = parseInt(clickedPitIndex);
  const isPlayer1 = currentPlayer === "p1";

  if (!validatePlay(isPlayer1, parsedClickedPitIndex, p1Pits, p2Pits)) return { p1Pits, p2Pits, p1Score, p2Score, repeatPlay, gameOver };

  play(parsedClickedPitIndex, isPlayer1);

  gameRules.checkGameOver(p1Pits, p2Pits) ? gameOver = true : gameOver = false;

  return { p1Pits, p2Pits, p1Score, p2Score, repeatPlay, gameOver };
};

const play = (clickedPitIndex, isPlayer1) => {
  const valueSelected = isPlayer1 ? p1Pits[clickedPitIndex] : p2Pits[clickedPitIndex];
  isPlayer1 ? p1Pits[clickedPitIndex] = 0 : p2Pits[clickedPitIndex] = 0;

  handleTurn(valueSelected, clickedPitIndex, isPlayer1);

  const { p1UpdatedPits, p2UpdatedPits } = gameRules.checkStealValueRule(p1Pits, p2Pits, isPlayer1, valueSelected, clickedPitIndex);

  p1Pits = p1UpdatedPits;
  p2Pits = p2UpdatedPits;
}

const handleTurn = (valueSelected, clickedPitIndex, isPlayer1) => {
  let currValue = valueSelected;

  if (isPlayer1 && valueSelected > clickedPitIndex || !isPlayer1 && valueSelected + clickedPitIndex >= p2Pits.length) {
    // rule for when it lands in score pit!
    repeatPlay = gameRules.checkRepeatPlayRule(clickedPitIndex, valueSelected, isPlayer1);
    isPlayer1 ? p1Score++ : p2Score++;
    currValue--;
  }

  currValue = isPlayer1 ? updateP1Pits(currValue, clickedPitIndex) : updateP2Pits(currValue, clickedPitIndex);

  if (currValue > 0) {
    currValue = isPlayer1 ? updateP2Pits(currValue, -1) : updateP1Pits(currValue, p1Pits.length);
  }

  if (currValue > 0) {
    isPlayer1 ? p2Score++ : p1Score++;
    currValue--;
    isPlayer1 ? updateP1Pits(currValue, p1Pits.length) : updateP2Pits(currValue, p2Pits.length);
  }

  if (currValue > 0) console.log("Overflow detected.");
}

const updateP1Pits = (currValue, startIndex) => {
  for (let i = startIndex - 1; i >= 0; i--) {
    if (currValue === 0) break;
    p1Pits[i]++;
    currValue--;
  }

  return currValue;
}

const updateP2Pits = (currValue, startIndex) => {
  for (let i = startIndex + 1; i <= p2Pits.length; i++) {
    if (currValue === 0 || i === 6) break;
    p2Pits[i]++;
    currValue--;
  }

  return currValue;
}

const validatePlay = (isPlayer1, parsedClickedPitIndex, p1Pits, p2Pits) => {
  if (isPlayer1 && p1Pits[parsedClickedPitIndex] === 0 || !isPlayer1 && p2Pits[parsedClickedPitIndex] === 0) {
    repeatPlay = true;
    return false;
  }

  return true;
}

module.exports = { updateGameState };
