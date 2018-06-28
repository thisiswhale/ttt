const assert = require('assert');
let {Player, Gameboard} = require('../script.js');

describe("Tic Tac Toe App Test",function() {

  let testBoard;
  let playerOne = Player('Player1', 'x');
  let playerTwo = Player('Player2', 'o');
  let computer = Player('Computer', 'o');

  before(function() {
     testBoard = Gameboard();
     testBoard.resetGame();
  })

	describe("Starting a game",function() {
		it("should have total moves of 9", function() {
      let len =testBoard.getBoard().length
	     assert.deepEqual(len, 9);
	  });
    it("should contain array with integers 0-8", function() {
    assert.deepEqual(testBoard.getBoard(), [0,1,2,3,4,5,6,7,8]);
    });
    it("should have first move by Player 1", function() {
    assert.deepEqual(testBoard.isPlayer1Turn(), true);
    });
	});
	describe("Player1's first move",function() {
    it("should have a cell fill by Player1's move", function() {
      testBoard.markSquare(2, playerOne);
      assert.deepEqual(testBoard.getBoard()[2],playerOne.marker);
    });
    it("should be a data type string by Player1's move", function() {
      assert.deepEqual(typeof testBoard.getBoard()[0],'number');
      assert.deepEqual(typeof testBoard.getBoard()[1],'number');
      assert.deepEqual(typeof testBoard.getBoard()[2],'string');
    });
    it("should not end the game", function() {
      assert.deepEqual(testBoard.isGameOver(testBoard.isWinner(playerOne)), false);
    });
    it("should switch player move", function() {
      testBoard.changeTurn();
      assert.deepEqual(testBoard.isPlayer1Turn(), false);
    });
	});
  describe("Player2's move",function() {
    it("should have a cell fill by Player2's move", function() {
      testBoard.markSquare(4, playerTwo);
      assert.deepEqual(testBoard.getBoard()[2],playerOne.marker);
    });
    it("should be a data type string by Player2's move", function() {
      assert.deepEqual(typeof testBoard.getBoard()[0],'number');
      assert.deepEqual(typeof testBoard.getBoard()[1],'number');
      assert.deepEqual(typeof testBoard.getBoard()[4],'string');
    });
    it("should not end the game", function() {
      assert.deepEqual(testBoard.isGameOver(testBoard.isWinner(playerTwo)), false);
    });
    it("should switch player move", function() {
      testBoard.changeTurn();
      assert.deepEqual(testBoard.isPlayer1Turn(), true);
    });
  });
  describe("Reset the game",function() {
    it("should have total moves of 9", function() {
      testBoard.resetGame();
      let len =testBoard.getBoard().length
       assert.deepEqual(len, 9);
    });
    it("should contain array with integers 0-8", function() {
    assert.deepEqual(testBoard.getBoard(), [0,1,2,3,4,5,6,7,8]);
    });
    it("should have first move by Player 1", function() {
    assert.deepEqual(testBoard.isPlayer1Turn(), true);
    });

  });
  describe("Winner indicator",function() {
    it("should have a horizonal win", function() {
      testBoard.markSquare(0, playerOne);
      testBoard.markSquare(1, playerOne);
      testBoard.markSquare(2, playerOne);
      let player =testBoard.isWinner(playerOne);
      assert.deepEqual(player.marker, playerOne.marker);
      let result =testBoard.isGameOver(player);
      assert.deepEqual(result, [0,1,2]);

      testBoard.resetGame();
      testBoard.markSquare(3, playerOne);
      testBoard.markSquare(4, playerOne);
      testBoard.markSquare(5, playerOne);
      player =testBoard.isWinner(playerOne);
      assert.deepEqual(player.marker, playerOne.marker);
      result =testBoard.isGameOver(player);
      assert.deepEqual(result, [3,4,5]);

      testBoard.resetGame();
      testBoard.markSquare(6, playerOne);
      testBoard.markSquare(7, playerOne);
      testBoard.markSquare(8, playerOne);
      player =testBoard.isWinner(playerOne);
      assert.deepEqual(player.marker, playerOne.marker);
      result =testBoard.isGameOver(player);
      assert.deepEqual(result, [6,7,8]);
    });
    it("should have a vertical win", function() {
      testBoard.resetGame();
      testBoard.markSquare(0, playerOne);
      testBoard.markSquare(3, playerOne);
      testBoard.markSquare(6, playerOne);
      let player =testBoard.isWinner(playerOne);
      assert.deepEqual(player.marker, playerOne.marker);
      let result =testBoard.isGameOver(player);
      assert.deepEqual(result, [0,3,6]);

      testBoard.resetGame();
      testBoard.markSquare(1, playerOne);
      testBoard.markSquare(4, playerOne);
      testBoard.markSquare(7, playerOne);
      player =testBoard.isWinner(playerOne);
      assert.deepEqual(player.marker, playerOne.marker);
      result =testBoard.isGameOver(player);
      assert.deepEqual(result, [1,4,7]);

      testBoard.resetGame();
      testBoard.markSquare(2, playerOne);
      testBoard.markSquare(5, playerOne);
      testBoard.markSquare(8, playerOne);
      player =testBoard.isWinner(playerOne);
      assert.deepEqual(player.marker, playerOne.marker);
      result =testBoard.isGameOver(player);
      assert.deepEqual(result, [2,5,8]);
    });
    it("should have a diagonal win", function() {
      testBoard.resetGame();
      testBoard.markSquare(0, playerOne);
      testBoard.markSquare(4, playerOne);
      testBoard.markSquare(8, playerOne);
      let player =testBoard.isWinner(playerOne);
      assert.deepEqual(player.marker, playerOne.marker);
      let result =testBoard.isGameOver(player);
      assert.deepEqual(result, [0,4,8]);

      testBoard.resetGame();
      testBoard.markSquare(2, playerOne);
      testBoard.markSquare(4, playerOne);
      testBoard.markSquare(6, playerOne);
      player =testBoard.isWinner(playerOne);
      assert.deepEqual(player.marker, playerOne.marker);
      result =testBoard.isGameOver(player);
      assert.deepEqual(result, [2,4,6]);
    });
  });

  describe("Draw indicator",function() {
    it("should return a tie", function() {
      testBoard.resetGame();
      testBoard.markSquare(1, playerOne);
      testBoard.markSquare(3, playerTwo);
      testBoard.markSquare(4, playerOne);
      testBoard.markSquare(7, playerTwo);
      testBoard.markSquare(6, playerOne);
      testBoard.markSquare(2, playerTwo);
      testBoard.markSquare(0, playerOne);
      testBoard.markSquare(8, playerTwo);
      testBoard.markSquare(5, playerOne)
      let playerI =testBoard.isWinner(playerOne);
      let playerII =testBoard.isWinner(playerTwo);
      assert.deepEqual(playerI, null);
      assert.deepEqual(playerII, null);
      let resultI = testBoard.isGameOver(playerI);
      let resultII = testBoard.isGameOver(playerII);
      assert.deepEqual(resultI, 'draw');
      assert.deepEqual(resultII, 'draw');
    });
  });

  describe("Playing against a Computer",function() {

    it("should have first move by Player 1", function() {
    testBoard.resetGame();
    assert.deepEqual(testBoard.isPlayer1Turn(), true);
    });

    it("should get computer's move to be a number", function() {
        testBoard.markSquare(1, playerOne);
        assert.deepEqual(typeof testBoard.getComputerTurnId(computer), 'number');
    });
    it("should find a possible win", function() {
      testBoard.resetGame();
      testBoard.markSquare(1, playerOne);

      testBoard.markSquare(testBoard.getComputerTurnId(computer), computer);
      testBoard.markSquare(2, playerOne);
      testBoard.markSquare(testBoard.getComputerTurnId(computer), computer);
      testBoard.markSquare(5, playerOne);

      let player =testBoard.isWinner(playerOne);
      let result =testBoard.isGameOver(player);
      assert.deepEqual(player, null);
      assert.deepEqual(result, false);

      testBoard.markSquare(testBoard.getComputerTurnId(computer), computer);
      let playerAI =testBoard.isWinner(computer);
      let resultAI =testBoard.isGameOver(playerAI);
      assert.deepEqual(playerAI.marker, computer.marker);
      assert.deepEqual(typeof resultAI, 'object');

    });
    it("should not allow a Human to win, Human Lose", function() {
      testBoard.resetGame();
      testBoard.markSquare(3, playerOne);
      testBoard.markSquare(testBoard.getComputerTurnId(computer), computer);
      testBoard.markSquare(5, playerOne);
      testBoard.markSquare(testBoard.getComputerTurnId(computer), computer);
      testBoard.markSquare(8, playerOne);
      testBoard.markSquare(testBoard.getComputerTurnId(computer), computer);
      testBoard.markSquare(1, playerOne);
      testBoard.markSquare(testBoard.getComputerTurnId(computer), computer);

      let player =testBoard.isWinner(playerOne);
      let result =testBoard.isGameOver(player);
      assert.deepEqual(player, null);
      assert.deepEqual(result, false);

      testBoard.markSquare(testBoard.getComputerTurnId(computer), computer);
      let playerAI =testBoard.isWinner(computer);
      let resultAI =testBoard.isGameOver(playerAI);
      assert.deepEqual(playerAI.marker, computer.marker);
      assert.deepEqual(typeof resultAI, 'object');
    });
    it("should not allow a Human to win, Draw", function() {
      testBoard.resetGame();
      testBoard.markSquare(3, playerOne);
      testBoard.markSquare(testBoard.getComputerTurnId(computer), computer);
      testBoard.markSquare(4, playerOne);
      testBoard.markSquare(testBoard.getComputerTurnId(computer), computer);
      testBoard.markSquare(2, playerOne);
      testBoard.markSquare(testBoard.getComputerTurnId(computer), computer);
      testBoard.markSquare(7, playerOne);
      testBoard.markSquare(testBoard.getComputerTurnId(computer), computer);
      testBoard.markSquare(8, playerOne);

      let player =testBoard.isWinner(playerOne);
      let playerAI =testBoard.isWinner(computer);
      let result =testBoard.isGameOver(player);
      let resultAI =testBoard.isGameOver(playerAI)

      assert.deepEqual(player, null);
      assert.deepEqual(playerAI, null);
      assert.deepEqual(result, 'draw');
      assert.deepEqual(resultAI, 'draw');
    });
  });
});
