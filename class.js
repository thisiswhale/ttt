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
const Computer = require('./computer');
let ai = new Computer('name','o')
ai

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
		this.turnsLeft = this.grid.length;
		this.playerOneTurn = true;
	}

	isPlayerOneTurn(){
		return this.playerOneTurn;
	}

	setPlayerTurn(){
		this.playerOneTurn = !this.playerOneTurn;
	}

	getTurns(){
		return this.turnsLeft;
	}

	hasTie(){
		return this.grid.filter( square => typeof square !== 'number').length === 0;
	}

	hasWinner(player){
		const winSets = [
			[0, 1, 2], [3, 4, 5], [6, 7, 8],
			[0, 3, 6], [1, 4, 7], [2, 5, 8],
			[0, 4, 8], [2, 4, 6]
		];

		//finds the index of the player's marker
		const markersPlay = this.grid.reduce(
			(arr, gridIndexMarker, index) => (gridIndexMarker === player.marker) ? arr.concat(index): arr,[]);
		let winner = null;
		//use winSets to compare markersPlay to find the winning combination
		for (let [index, thisSet] of winSets.entries()) {
			if (thisSet.every(el => markersPlay.indexOf(el) > -1)) {
				winner = Object.assign(player, {index:winSets[index]});
				break;
			}
		}
		return winner;
	}
}
let a = [...Array(9).keys()]
let b = a.filter(index => typeof index == 'number');
let c = ['x','o','x']
let d = c.filter(index => typeof index == 'number')


let test = new Tictactoe();
console.log(test.isPlayerOneTurn())
let p = new Human('human', 'x');
console.log(p.getData().marker)
p.setSquare(test.getBoard(), 1);
p.setSquare(test.getBoard(), 0);
p.setSquare(test.getBoard(), 2);
console.log(test.getBoard())
console.log(test.hasWinner(p.getData()))
console.log(test.hasTie())

// test.hasWinner() || test.hasTie
class initGame {
	constructor(setting) {
		this.board = new Tictactoe();
		this.players = [new Human("x"), new Human("o")];
	}
}
