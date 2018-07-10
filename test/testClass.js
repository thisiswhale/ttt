const assert = require('assert');

const Human = require('../Human.js');
const Computer = require('../Computer.js');
const Tictactoe = require('../Tictactoe.js');

describe("Tic Tac Toe App Test", function() {
	let testBoard;
	let playerOne = new Human('Player1', 'x');
	let playerTwo = new Human('Player2', 'o');
	let computer = new Computer('Computer', 'o');

	before(function() {
		testBoard = new Tictactoe();
	});

	describe("Starting a game", function() {
		it("should have total moves of 9", function() {
			let len = testBoard.getBoard().length
			assert.deepEqual(len, 9);
		});

		it("should contain array with integers 0-8", function() {
			assert.deepEqual(testBoard.getBoard(), [0, 1, 2, 3, 4, 5, 6, 7, 8]);
		});

		it("should have first move by Player 1", function() {
			assert.deepEqual(testBoard.isPlayerOneTurn(), true);
		});
	});

	describe("Player1's first move",function() {
		it("should have a cell fill by Player1's move", function() {
			playerOne.setSquare(testBoard.getBoard(), 2);
			assert.deepEqual(testBoard.getBoard()[2],playerOne.marker);
		});

		it("should be a data type string by Player1's move", function() {
			assert.deepEqual(typeof testBoard.getBoard()[0],'number');
			assert.deepEqual(typeof testBoard.getBoard()[1],'number');
			assert.deepEqual(typeof testBoard.getBoard()[2],'string');
		});

		it("should not end the game", function() {
			assert.deepEqual(testBoard.isGameOver(playerOne.isWinner(testBoard.getBoard(), playerOne.getData().marker)), false);
		});

		it("should switch player move", function() {
			testBoard.setPlayerTurn();
			assert.deepEqual(testBoard.isPlayerOneTurn(), false);
		});
	});

	describe("Player2's move",function() {
    it("should have a cell fill by Player2's move", function() {
			playerTwo.setSquare(testBoard.getBoard(), 4);
      assert.deepEqual(testBoard.getBoard()[4],playerTwo.marker);
    });

    it("should be a data type string by Player2's move", function() {
      assert.deepEqual(typeof testBoard.getBoard()[0],'number');
      assert.deepEqual(typeof testBoard.getBoard()[1],'number');
      assert.deepEqual(typeof testBoard.getBoard()[4],'string');
    });

    it("should not end the game", function() {
			assert.deepEqual(testBoard.isGameOver(playerTwo.isWinner(testBoard.getBoard(), playerTwo.getData().marker)), false);
    });

    it("should switch player move", function() {
      testBoard.setPlayerTurn();
      assert.deepEqual(testBoard.isPlayerOneTurn(), true);
    });
  });

});
