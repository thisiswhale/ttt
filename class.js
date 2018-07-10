"use strict";

class Player {
	constructor(name, marker) {
		this.name = name;
		this.marker = marker;
	}

	getData(){
		return {
			name:this.name,
			marker: this.marker
		};
	}

	isWinner(grid, playerMarker){
		const winSets = [
			[0, 1, 2], [3, 4, 5], [6, 7, 8],
			[0, 3, 6], [1, 4, 7], [2, 5, 8],
			[0, 4, 8], [2, 4, 6]
		];

		//finds the index of the player's marker
		let markersPlay = grid.reduce((arr, gridIndexMarker, index) =>
				(gridIndexMarker === playerMarker) ? arr.concat(index) : arr, []);
		let winner = null;
		//use winSets to compare markersPlay to find the winning combination
			for (let [index, thisSet] of winSets.entries()) {
				if (thisSet.every(el => markersPlay.indexOf(el) > -1)) {
					winner = { index: winSets[index], playerMarker};
					break;
				}
			}
		return winner;
	}
}

class Human extends Player {
	constructor(name, marker){
		super(name,marker);
	}

	setSquare(gameboard,squareId) {
		gameboard[squareId] = this.marker;
	}
}

class Board {
	constructor() {
		this.grid = [...Array(9).keys()];
	}

	getBoard() {
		return this.grid;
	}
}

class Tictactoe extends Board{
	constructor(){
		super();
		this.playerOneTurn = true;
	}

	isPlayerOneTurn(){
		return this.playerOneTurn;
	}

	setPlayerTurn(){
		this.playerOneTurn = !this.playerOneTurn;
	}

	hasTie(){
		return this.grid.filter( square => typeof square !== 'number').length === 0;
	}

	isGameOver(hasWon){
		return hasWon || this.hasTie();
	}
}

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

let test = new Tictactoe();
let p = new Human('human', 'x');
let ai = new Computer('name','o')

p.setSquare(test.getBoard(), 1);
console.log(test.getBoard());
ai.setSquare(test.getBoard())
console.log(test.getBoard());
p.setSquare(test.getBoard(), 2);
console.log(test.getBoard());
ai.setSquare(test.getBoard());
console.log(test.getBoard());
p.setSquare(test.getBoard(), 8);
console.log(test.hasTie())
console.log(test.isGameOver(p.isWinner(test.getBoard(), p.getData().marker)))
console.log(test.getBoard())
console.log(p.isWinner(test.getBoard(), p.getData().marker))
// console.log(test.hasTie())


// test.isWinner() || test.hasTie
class initGame {
	constructor(setting) {
		this.board = new Tictactoe();
		this.players = [new Human("x"), new Human("o")];
	}
}
