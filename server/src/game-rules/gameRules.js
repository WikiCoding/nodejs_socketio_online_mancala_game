const checkStealValueRule = (p1Pits, p2Pits, isPlayer1, valueSelected, clickedPitIndex, p1Score, p2Score) => {
  let lastPitIndex = 0;
  let valueSelectedUpdated = valueSelected; // this update is needed so the handleTurn updates to the vector doesn't override the value of lastPitIndex

  if (isPlayer1 && valueSelected <= clickedPitIndex) {
    lastPitIndex = clickedPitIndex - valueSelected;
    if (p1Pits[lastPitIndex] === 0) {
      p1Score += p2Pits[lastPitIndex] + 1;
      p1Pits[lastPitIndex] = 0;
      p2Pits[lastPitIndex] = 0;
      valueSelectedUpdated = valueSelected - 1;
    }
  }

  if (!isPlayer1 && clickedPitIndex + valueSelected < p2Pits.length) {
    lastPitIndex = clickedPitIndex + valueSelected;

    if (p2Pits[lastPitIndex] === 0) {
      p2Score += p1Pits[lastPitIndex] + 1;
      p2Pits[lastPitIndex] = 0;
      p1Pits[lastPitIndex] = 0;
      valueSelectedUpdated = valueSelected - 1;
    }
  }

  return { p1UpdatedPits: p1Pits, p2UpdatedPits: p2Pits, currentP1Score: p1Score, currentP2Score: p2Score, valueSelectedUpdated };
}

const checkRepeatPlayRule = (clickedPitIndex, valueSelected, isPlayer1) => {
  let repeatPlay = false;

  if (isPlayer1) {
    valueSelected === clickedPitIndex + 1 ? repeatPlay = true : repeatPlay = false;
    return repeatPlay;
  }

  valueSelected + clickedPitIndex === 6 ? repeatPlay = true : repeatPlay = false;

  return repeatPlay;
}

const checkGameOver = (p1Pits, p2Pits) => {
  const p1Empty = p1Pits.every(pit => pit === 0);
  const p2Empty = p2Pits.every(pit => pit === 0);

  return p1Empty || p2Empty ? true : false;
}

module.exports = { checkStealValueRule, checkRepeatPlayRule, checkGameOver };