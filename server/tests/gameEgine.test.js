const { play } = require('../src/game-engine/gameEngine');

describe('Game Engine', () => {
  describe('play', () => {
    test('should correctly handle player 1 turn and repeat play due to landing in score pit', () => {
      const p1Pits = [4, 4, 4, 4, 4, 4];
      const p2Pits = [4, 4, 4, 4, 4, 4];
      const p1Score = 0;
      const p2Score = 0;
      const clickedPitIndex = 3;
      const isPlayer1 = true;

      const result = play(clickedPitIndex, isPlayer1, p1Pits, p2Pits, p1Score, p2Score);

      expect(result.p1UpdatedPits[0]).toBe(5); // Selected pit should be empty
      expect(result.p1UpdatedPits[1]).toBe(5); // Next pit should have one more
      expect(result.p1UpdatedPits[2]).toBe(5);
      expect(result.p1UpdatedPits[3]).toBe(0);
      expect(result.p1UpdatedPits[4]).toBe(4);
      expect(result.p1UpdatedPits[5]).toBe(4);
      expect(result.p2UpdatedPits).toEqual(p2Pits); // Player 2 pits should remain unchanged
      expect(result.p1Score).toBe(1);
      expect(result.p2Score).toBe(0);
      expect(result.repeatPlay).toBe(true);
      expect(result.gameOver).toBe(false);
    });

    test('should correctly handle player 2 turn and repeat play due to landing in score pit', () => {
      const p1Pits = [4, 4, 4, 4, 4, 4];
      const p2Pits = [4, 4, 4, 4, 4, 4];
      const p1Score = 0;
      const p2Score = 0;
      const clickedPitIndex = 2;
      const isPlayer1 = false;

      const result = play(clickedPitIndex, isPlayer1, p1Pits, p2Pits, p1Score, p2Score);

      expect(result.p2UpdatedPits[0]).toBe(4); // Selected pit should be empty
      expect(result.p2UpdatedPits[1]).toBe(4); // Next pit should have one more
      expect(result.p2UpdatedPits[2]).toBe(0);
      expect(result.p2UpdatedPits[3]).toBe(5);
      expect(result.p2UpdatedPits[4]).toBe(5);
      expect(result.p2UpdatedPits[5]).toBe(5);
      expect(result.p1UpdatedPits).toEqual(p1Pits);
      expect(result.p1Score).toBe(0);
      expect(result.p2Score).toBe(1);
      expect(result.repeatPlay).toBe(true);
      expect(result.gameOver).toBe(false);
    });

    test('should correctly handle player 2 turn and overflow to the next player pit', () => {
      const p1Pits = [4, 4, 4, 4, 4, 4];
      const p2Pits = [4, 4, 5, 4, 4, 4];
      const p1Score = 0;
      const p2Score = 0;
      const clickedPitIndex = 2;
      const isPlayer1 = false;

      const result = play(clickedPitIndex, isPlayer1, p1Pits, p2Pits, p1Score, p2Score);

      expect(result.p1UpdatedPits[0]).toBe(4);
      expect(result.p1UpdatedPits[1]).toBe(4);
      expect(result.p1UpdatedPits[2]).toBe(4);
      expect(result.p1UpdatedPits[3]).toBe(4);
      expect(result.p1UpdatedPits[4]).toBe(4);
      expect(result.p1UpdatedPits[5]).toBe(5);
      expect(result.p2UpdatedPits[0]).toBe(4); // Selected pit should be empty
      expect(result.p2UpdatedPits[1]).toBe(4); // Next pit should have one more
      expect(result.p2UpdatedPits[2]).toBe(0);
      expect(result.p2UpdatedPits[3]).toBe(5);
      expect(result.p2UpdatedPits[4]).toBe(5);
      expect(result.p2UpdatedPits[5]).toBe(5);
      expect(result.p1Score).toBe(0);
      expect(result.p2Score).toBe(1);
      expect(result.repeatPlay).toBe(false);
      expect(result.gameOver).toBe(false);
    });

    test('should correctly handle player 1 turn and score and steal value from player 2 pit when landing on his pit with value 0', () => {
      const p1Pits = [5, 0, 4, 4, 4, 4];
      const p2Pits = [5, 4, 4, 4, 4, 4];
      const p1Score = 1;
      const p2Score = 0;
      const clickedPitIndex = 5;
      const isPlayer1 = true;

      const result = play(clickedPitIndex, isPlayer1, p1Pits, p2Pits, p1Score, p2Score);

      expect(result.p1UpdatedPits[0]).toBe(5);
      expect(result.p1UpdatedPits[1]).toBe(0);
      expect(result.p1UpdatedPits[2]).toBe(5);
      expect(result.p1UpdatedPits[3]).toBe(5);
      expect(result.p1UpdatedPits[4]).toBe(5);
      expect(result.p1UpdatedPits[5]).toBe(0);
      expect(result.p2UpdatedPits[0]).toBe(5);
      expect(result.p2UpdatedPits[1]).toBe(0);
      expect(result.p2UpdatedPits[2]).toBe(4);
      expect(result.p2UpdatedPits[3]).toBe(4);
      expect(result.p2UpdatedPits[4]).toBe(4);
      expect(result.p2UpdatedPits[5]).toBe(4);
      expect(result.p1Score).toBe(6);
      expect(result.p2Score).toBe(0);
      expect(result.repeatPlay).toBe(false);
      expect(result.gameOver).toBe(false);
    });
  });
});
