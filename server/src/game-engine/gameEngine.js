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
  isPlayer1 ? p1Pits[clickedPitIndex] = 0 : p2Pits[clickedPitIndex] = 0;

  handleTurn(valueSelected, clickedPitIndex, isPlayer1);

  const { p1UpdatedPits, p2UpdatedPits } = gameRules.checkStealValueRule(p1Pits, p2Pits, isPlayer1, valueSelected, clickedPitIndex);

  gameRules.checkGameOver(p1UpdatedPits, p1UpdatedPits) ? gameOver = true : gameOver = false;

  return { p1UpdatedPits, p2UpdatedPits, p1Score, p2Score, repeatPlay, gameOver };
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

module.exports = { play };