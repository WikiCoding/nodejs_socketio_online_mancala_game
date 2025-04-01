const checkStealValueRule = (p1Pits, p2Pits, isPlayer1, valueSelected, clickedPitIndex) => {
  // checks if it's player 1 turn and p1Pit[landingPitIndex] lands in a zero value pit and if so, it will add the p2Pit[landingPitIndex] to the p1Pit[landingPitIndex] score and set the p2Pit[landingPitIndex] to 0. Does the opposite for player 2
  let lastPitIndex = 0;

  if (isPlayer1 && valueSelected <= clickedPitIndex) {
    lastPitIndex = clickedPitIndex - valueSelected;
    if (p1Pits[lastPitIndex] === 0) {
      p1Pits[lastPitIndex] += p2Pits[lastPitIndex];
      p2Pits[lastPitIndex] = 0;
    }
  }

  if (!isPlayer1 && clickedPitIndex + valueSelected < p2Pits.length) {
    lastPitIndex = clickedPitIndex + valueSelected;

    if (p2Pits[lastPitIndex] === 0) {
      p2Pits[lastPitIndex] += p1Pits[lastPitIndex] + 1;
      p1Pits[lastPitIndex] = 0;
    }
  }

  return { p1UpdatedPits: p1Pits, p2UpdatedPits: p2Pits };
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