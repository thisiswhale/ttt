"use strict";
const Player = require("./Player.js");

class Computer extends Player {
	constructor(name, marker) {
		super(name, marker);
	}

	emptySquares(arr) {
		return arr.filter(cell => cell != 'x' && cell != 'o');
	}

	createMovesArr(board, availSquares, playerMarker) {

		let moves = [];

		for (let i = 0; i < availSquares.length; i++) {
			let move = {};
			move.index = board[availSquares[i]];
			// simulate move by current player
			board[availSquares[i]] = playerMarker;

			// pass simulated board down to next depth with opposing player as current player
			let result;
			const oppPlayerMarker = (playerMarker === 'o'? 'x': 'o');
			result = this.minimax(board, oppPlayerMarker);
			move.score = result.score;

			// simualted spot is returned to null before next simulated move
			board[availSquares[i]] = move.index;
			moves.push(move);
		}
		return moves;
	}

	bestIdFromMoves(movesArr, playerMarker) {
		let bestId;
		let bestScore;
		if (playerMarker === 'o') {
			// AI player aims to maximize score
			bestScore = -100000;
			movesArr.forEach((move, id) => {
				if (movesArr[id].score > bestScore) {
					bestScore = movesArr[id].score;
					bestId = id;
				}
			})
		} else {
			// human player aims to minimize score
			bestScore = 100000;
			movesArr.forEach((move, id) => {
				if (movesArr[id].score < bestScore) {
					bestScore = movesArr[id].score;
					bestId = id;
				}
			})
		}
		return bestId;
	}

	minimax(board, playerMarker) {
		// determine all null indices of board array
		let availSquares = this.emptySquares(board);

		// recursive base cases
		if (this.isWinner(board, 'x')) {
			//humans win game
			return {score: -10};
		} else if (this.isWinner(board, 'o')) {
			//computer wins game
			return {score: 10};
		} else if (availSquares.length === 0) {
			//human and computer tie
			return {score: 0};
		}

		// create an array of all possible move objects, each of which contains an
		// index and a score
		const moves = this.createMovesArr(board, availSquares, playerMarker);

		// select the index of the best move (from the moves array) by score based on the current player
		const bestIdSquare = this.bestIdFromMoves(moves, playerMarker);

		// return the chosen move(object)from the array to the higher depth
		return moves[bestIdSquare];
	}

	setSquare(gameboard) {
		let getBestMoveId = this.minimax(gameboard, this.marker).index;
		gameboard[getBestMoveId] = this.marker;
	}
}

module.exports = Computer;
