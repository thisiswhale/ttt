"use strict";

class Player {
	constructor(name, marker) {
		this.name = name;
		this.marker = marker;
	}
	getInfo(){
		return {this.name, this.marker}
	}
	getName(){
		return this.name;
	}
	getMarker() {
		return this.marker;
	}

	markSquare(gameboard,squareId) {
		gameboard[squareId] = this.marker;
	}

}
let hello = new Player('hu', 'x')

class Board {
	constructor() {
		this.grid = [...Array(9).keys()];
		this.turnsLeft = this.grid.length;
		this.playerOneTurn = true;
	}

	getBoard() {
		return this.grid;
	}

	isPlayerTurn(){
		return playerOneTurn;
	}

	checkWin(grid, marker) {
		//finds the index of the player's marker
		const markersPlay = grid.reduce(
			(arr, gridIndexMarker, index) => (gridIndexMarker === marker)
			? arr.concat(index)
			: arr,
		[]);
		let gameWon = null;
		//use winSets to compare markersPlay to find the winning combination
		for (let [index, thisSet] of winSets.entries()) {
			if (thisSet.every(el => markersPlay.indexOf(el) > -1)) {
				gameWon = {
					index,
					marker
				};
				break;
			}
		}
		return gameWon;
	}
}

class initGame {
	constructor() {
		this.board = new Board();
		this.players = [new Player("x"), new Player("o")];
	}
}

class Game {
	constructor() {
		this.board = new Board();
		this.players = [new Player("x"), new Player("o")];
	}
}
