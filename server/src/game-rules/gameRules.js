const checkStealValueRule = (p1Pits, p2Pits, isPlayer1, lastPitIndex, p1Score, p2Score) => {
  if (isPlayer1 && p1Pits[lastPitIndex] === 0) {
    p1Score += p2Pits[lastPitIndex] + 1;
    p1Pits[lastPitIndex] = 0;
    p2Pits[lastPitIndex] = 0;
  }

  if (!isPlayer1 && p2Pits[lastPitIndex] === 0) {
    p2Score += p1Pits[lastPitIndex] + 1;
    p1Pits[lastPitIndex] = 0;
    p2Pits[lastPitIndex] = 0;
  }

  return { p1UpdatedPits: p1Pits, p2UpdatedPits: p2Pits, currentP1Score: p1Score, currentP2Score: p2Score };
}

const checkRepeatPlayRule = (landingPitIndex) => {
  if (landingPitIndex === 6) return true;
  if (landingPitIndex === 13) return true;
  return false;
}

const checkGameOver = (p1Pits, p2Pits) => {
  const p1Empty = p1Pits.every(pit => pit === 0);
  const p2Empty = p2Pits.every(pit => pit === 0);

  return p1Empty || p2Empty ? true : false;
}

module.exports = { checkStealValueRule, checkRepeatPlayRule, checkGameOver };