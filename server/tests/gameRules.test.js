const { checkStealValueRule, checkRepeatPlayRule, checkGameOver } = require('../src/game-rules/gameRules');

describe('Game Rules', () => {
  test('should return true for gameOver', () => {
    const result = checkGameOver([0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0]);
    expect(result).toBe(true);
  })

  test('should return false for gameOver', () => {
    const result = checkGameOver([1, 0, 0, 0, 0, 0], [0, 1, 0, 0, 0, 0]);
    expect(result).toBe(false);
  })

  test('should return true for repeatPlay', () => {
    const result = checkRepeatPlayRule(6);
    expect(result).toBe(true);
  })

  test('should return true for repeatPlay', () => {
    const result = checkRepeatPlayRule(13);
    expect(result).toBe(true);
  })

  test('should return false for repeatPlay', () => {
    const result = checkRepeatPlayRule(10);
    expect(result).toBe(false);
  })

  test('player1 should score with landing on his pit with balue 0 and steal the values from the pit in front of it', () => {
    const p1Pits = [4, 0, 4, 4, 4, 4];
    const p2Pits = [4, 4, 4, 4, 4, 4];
    const isPlayer1 = true;
    const lastPitIndex = 1;
    const p1Score = 0;
    const p2Score = 0;
    const result = checkStealValueRule(p1Pits, p2Pits, isPlayer1, lastPitIndex, p1Score, p2Score);
    expect(result.p1UpdatedPits).toEqual([4, 0, 4, 4, 4, 4]);
    expect(result.p2UpdatedPits).toEqual([4, 0, 4, 4, 4, 4]);
    expect(result.currentP1Score).toBe(5);
    expect(result.currentP2Score).toBe(0);
  })

  test('player2 should score with landing on his pit with balue 0 and steal the values from the pit in front of it', () => {
    const p1Pits = [4, 4, 4, 4, 4, 4];
    const p2Pits = [4, 4, 4, 4, 4, 0];
    const isPlayer1 = false;
    const lastPitIndex = 5;
    const p1Score = 0;
    const p2Score = 0;
    const result = checkStealValueRule(p1Pits, p2Pits, isPlayer1, lastPitIndex, p1Score, p2Score);
    expect(result.p1UpdatedPits).toEqual([4, 4, 4, 4, 4, 0]);
    expect(result.p2UpdatedPits).toEqual([4, 4, 4, 4, 4, 0]);
    expect(result.currentP1Score).toBe(0);
    expect(result.currentP2Score).toBe(5);
  })
});
