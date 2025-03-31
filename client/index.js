const socket = io();

const p1Pits = document.querySelectorAll("#p1 .button");
const p2Pits = document.querySelectorAll("#p2 .button");
const p1Score = document.querySelector(".p1input");
const p2Score = document.querySelector(".p2input");

const gameStateBuilder = () => {
  const p1PitsState = [];
  p1Pits.forEach((pit) => {
    p1PitsState.push(parseInt(pit.innerHTML));
  });
  const p2PitsState = [];
  p2Pits.forEach((pit) => {
    p2PitsState.push(parseInt(pit.innerHTML));
  });

  const p1ScoreState = p1Score.value ? parseInt(p1Score.value) : 0;
  const p2ScoreState = p2Score.value ? parseInt(p2Score.value) : 0;

  return { p1PitsState, p2PitsState, p1ScoreState, p2ScoreState };
}

p1Pits.forEach((pit) => {
  pit.addEventListener("click", () => {
    socket.emit("player-selection", pit.id, gameStateBuilder());
  });
});

p2Pits.forEach((pit) => {
  pit.addEventListener("click", () => {
    socket.emit("player-selection", pit.id, gameStateBuilder());
  });
});

socket.on("game-state-update", (newGameState) => {
  console.log(newGameState);

  for (let i = 0; i < p1Pits.length; i++) {
    p1Pits[i].innerHTML = newGameState.p1Pits[i];
  }

  for (let i = 0; i < p2Pits.length; i++) {
    p2Pits[i].innerHTML = newGameState.p2Pits[i];
  }

  p1Score.value = newGameState.p1Score;
  p2Score.value = newGameState.p2Score;
});
