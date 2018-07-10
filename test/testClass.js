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
			let grid = testBoard.getBoard();
			let len = grid.length
			assert.deepEqual(len, 9);
		});

		it("should contain array with integers 0-8", function() {
			let grid = testBoard.getBoard();
			assert.deepEqual(grid, [0, 1, 2, 3, 4, 5, 6, 7, 8]);
		});

		it("should have first move by Player 1", function() {
			assert.deepEqual(testBoard.isPlayerOneTurn(), true);
		});
	});

	describe("Player1's first move",function() {
		it("should have a cell fill by Player1's move", function() {
			let grid = testBoard.getBoard();
			playerOne.setSquare(grid, 2);
			assert.deepEqual(grid[2],playerOne.marker);
		});

		it("should be a data type string by Player1's move", function() {
			let grid = testBoard.getBoard();
			assert.deepEqual(typeof grid[0],'number');
			assert.deepEqual(typeof grid[1],'number');
			assert.deepEqual(typeof grid[2],'string');
		});

		it("should not end the game", function() {
			let grid = testBoard.getBoard();
			assert.deepEqual(testBoard.isGameOver(playerOne.isWinner(grid)), false);
		});

		it("should switch player move", function() {
			testBoard.setPlayerTurn();
			assert.deepEqual(testBoard.isPlayerOneTurn(), false);
		});
	});

	describe("Player2's move",function() {
    it("should have a cell fill by Player2's move", function() {
			let grid = testBoard.getBoard();
			playerTwo.setSquare(grid, 4);
      assert.deepEqual(grid[4],playerTwo.marker);
    });

    it("should be a data type string by Player2's move", function() {
			let grid = testBoard.getBoard();
      assert.deepEqual(typeof grid[0],'number');
      assert.deepEqual(typeof grid[1],'number');
      assert.deepEqual(typeof grid[4],'string');
    });

    it("should not end the game", function() {
			let grid = testBoard.getBoard();
			assert.deepEqual(testBoard.isGameOver(playerTwo.isWinner(grid)), false);
    });

    it("should switch player move", function() {
			let grid = testBoard.getBoard();
      testBoard.setPlayerTurn();
      assert.deepEqual(testBoard.isPlayerOneTurn(), true);
    });
  });

	describe("Reset the game",function() {
    it("should have total moves of 9", function() {
      testBoard = new Tictactoe();
			let grid = testBoard.getBoard();
      let len =grid.length
      assert.deepEqual(len, 9);
    });
    it("should contain array with integers 0-8", function() {
		let grid = testBoard.getBoard();
    assert.deepEqual(grid, [0,1,2,3,4,5,6,7,8]);
    });
    it("should have first move by Player 1", function() {
    assert.deepEqual(testBoard.isPlayerOneTurn(), true);
    });
  });

	describe("Winning row indicator",function() {
    it("should have a win in Row 1", function() {
			testBoard = new Tictactoe();
			let grid = testBoard.getBoard();;
			playerOne.setSquare(grid, 0);
			playerOne.setSquare(grid, 1);
			playerOne.setSquare(grid, 2);

      let player = playerOne.isWinner(grid);
      assert.deepEqual(player.marker, playerOne.marker);
      assert.deepEqual(player.index, [0,1,2]);
		});

		it("should have a win in Row 2", function() {
			testBoard = new Tictactoe();
			let grid = testBoard.getBoard();;
			playerOne.setSquare(grid, 3);
			playerOne.setSquare(grid, 4);
			playerOne.setSquare(grid, 5);

			let player = playerOne.isWinner(grid);
			assert.deepEqual(player.marker, playerOne.marker);
			assert.deepEqual(player.index, [3,4,5]);
		});

		it("should have a win in Row 3", function() {
			testBoard = new Tictactoe();
			let grid = testBoard.getBoard();;
			playerOne.setSquare(grid, 6);
			playerOne.setSquare(grid, 7);
			playerOne.setSquare(grid, 8);

			let player = playerOne.isWinner(grid);
			assert.deepEqual(player.marker, playerOne.marker);
			assert.deepEqual(player.index, [6,7,8]);
		});
	});

	describe("Winning horizontal indicator",function() {
    it("should have a win in Horizontal 1", function() {
			testBoard = new Tictactoe();
			let grid = testBoard.getBoard();;
			playerOne.setSquare(grid, 0);
			playerOne.setSquare(grid, 3);
			playerOne.setSquare(grid, 6);

      let player = playerOne.isWinner(grid);
      assert.deepEqual(player.marker, playerOne.marker);
      assert.deepEqual(player.index, [0,3,6]);
		});

		it("should have a win in Horizontal 2", function() {
			testBoard = new Tictactoe();
			let grid = testBoard.getBoard();;
			playerOne.setSquare(grid, 1);
			playerOne.setSquare(grid, 4);
			playerOne.setSquare(grid, 7);

			let player = playerOne.isWinner(grid);
			assert.deepEqual(player.marker, playerOne.marker);
			assert.deepEqual(player.index, [1,4,7]);
		});

		it("should have a win in Horizontal 3", function() {
			testBoard = new Tictactoe();
			let grid = testBoard.getBoard();;
			playerOne.setSquare(grid, 2);
			playerOne.setSquare(grid, 5);
			playerOne.setSquare(grid, 8);

			let player = playerOne.isWinner(grid);
			assert.deepEqual(player.marker, playerOne.marker);
			assert.deepEqual(player.index, [2,5,8]);
		});
	});

	describe("Winning diagonal indicator",function() {
		it("should have a win in Diagonal 1", function() {
			testBoard = new Tictactoe();
			let grid = testBoard.getBoard();;
			playerOne.setSquare(grid, 0);
			playerOne.setSquare(grid, 4);
			playerOne.setSquare(grid, 8);

			let player = playerOne.isWinner(grid);
			assert.deepEqual(player.marker, playerOne.marker);
			assert.deepEqual(player.index, [0,4,8]);
		});

		it("should have a win in Diagonal 2", function() {
			testBoard = new Tictactoe();
			let grid = testBoard.getBoard();;
			playerOne.setSquare(grid, 2);
			playerOne.setSquare(grid, 4);
			playerOne.setSquare(grid, 6);

			let player = playerOne.isWinner(grid);
			assert.deepEqual(player.marker, playerOne.marker);
			assert.deepEqual(player.index, [2,4,6]);
		});

	});
});
