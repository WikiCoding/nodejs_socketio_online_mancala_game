const gameRules = require('../game-rules/gameRules');

const play = (clickedPitIndex, isPlayer1, p1PitsCurrent, p2PitsCurrent, p1CurrentScore, p2CurrentScore) => {
  const valueSelected = isPlayer1 ? p1PitsCurrent[clickedPitIndex] : p2PitsCurrent[clickedPitIndex];

  const currentGameStateVector = buildCurrentGameStateVector(p1PitsCurrent, p1CurrentScore, p2PitsCurrent, p2CurrentScore);

  const convertedPitIndex = convertSelectedPitIndex(clickedPitIndex, isPlayer1);

  currentGameStateVector[convertedPitIndex] = 0;

  let lastPitIndex = -1;
  let hasLandedInZeroPit = false;

  for (i = valueSelected, j = convertedPitIndex + 1; i > 0; i--) {
    if (i === 1) {
      lastPitIndex = j;
      if (currentGameStateVector[j] === 0 && j !== 6 && j !== 13) {
        hasLandedInZeroPit = true;
        break;
      }
    }
    currentGameStateVector[j]++;
    j++;
    if (j === 14) j = 0;
  }

  const repeatPlay = gameRules.checkRepeatPlayRule(lastPitIndex);

  if (hasLandedInZeroPit) {
    const revertedIndex = revertLastPitIndex(lastPitIndex, isPlayer1);
    const result = gameRules.checkStealValueRule(currentGameStateVector.slice(0, 6).toReversed(), currentGameStateVector.slice(7, 13), isPlayer1, revertedIndex, currentGameStateVector[6], currentGameStateVector[13]);

    return {
      p1UpdatedPits: result.p1UpdatedPits,
      p2UpdatedPits: result.p2UpdatedPits,
      p1Score: result.currentP1Score,
      p2Score: result.currentP2Score,
      repeatPlay,
      gameOver: gameRules.checkGameOver(result.p1UpdatedPits, result.p2UpdatedPits)
    };
  }

  return {
    p1UpdatedPits: currentGameStateVector.slice(0, 6).toReversed(),
    p2UpdatedPits: currentGameStateVector.slice(7, 13),
    p1Score: currentGameStateVector[6],
    p2Score: currentGameStateVector[13],
    repeatPlay,
    gameOver: gameRules.checkGameOver(currentGameStateVector.slice(0, 6).toReversed(), currentGameStateVector.slice(7, 13))
  };
}

const revertLastPitIndex = (lastPitIndex, isPlayer1) => {
  // player1 is like this conversion due to array being reversed. The 6 corresponds to the pits.length
  if (isPlayer1 && lastPitIndex < 6) {
    return 6 - 1 - lastPitIndex;
  }

  if (!isPlayer1 && lastPitIndex > 6 && lastPitIndex < 13) {
    return lastPitIndex - 7
  }

  return -1;
}

const convertSelectedPitIndex = (clickedPitIndex, isPlayer1) => {
  // player1 is like this conversion due to array being reversed. The 6 corresponds to the pits.length
  return isPlayer1 ? 6 - 1 - clickedPitIndex : clickedPitIndex + 7;
}

const buildCurrentGameStateVector = (p1Pits, p1Score, p2Pits, p2Score) => {
  return [...p1Pits.toReversed(), p1Score, ...p2Pits, p2Score];
}

module.exports = { play };