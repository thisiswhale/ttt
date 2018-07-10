"use strict";
const Board = require("./Board.js");

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
		return this.grid.filter( square => typeof square === 'number').length === 0;
	}

	isGameOver(hasWon){
		return hasWon || this.hasTie();
	}
}

module.exports = Tictactoe;
