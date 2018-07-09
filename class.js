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
		this.turnsLeft = this.grid.length;
		this.playerOneTurn = true;
	}

	getBoard() {
		return this.grid;
	}

	isPlayerTurn(){
		return playerOneTurn;
	}

	hasWinner(marker) {
		const winSets = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6]
		];

		//finds the index of the player's marker
		const markersPlay = this.grid.reduce(
			(arr, gridIndexMarker, index) => (gridIndexMarker === marker) ? arr.concat(index): arr,[]);
		let winner = null;
		//use winSets to compare markersPlay to find the winning combination
		for (let [index, thisSet] of winSets.entries()) {
			if (thisSet.every(el => markersPlay.indexOf(el) > -1)) {
				winner = {index:winSets[index],	marker:marker};
				break;
			}
		}
		return winner;
	}
}

let test = new Board();
let p = new Human('human', 'x');
console.log(p.getData().marker)
p.setSquare(test.getBoard(), 1);
p.setSquare(test.getBoard(), 0);
p.setSquare(test.getBoard(), 2);
console.log(test.getBoard())
console.log(test.hasWinner('x'))

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
