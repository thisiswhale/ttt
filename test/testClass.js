const assert = require('assert');

const {Human} = require('../Human.js');
const {Computer} = require('../Computer.js');
const {Tictactoe} = require('../Tictactoe.js');


describe("Tic Tac Toe App Test",function() {
	let testBoard;
  let playerOne = new Human('Player1', 'x');
  let playerTwo = new Human('Player2', 'o');
  let computer = new Computer('Computer', 'o');

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

}
