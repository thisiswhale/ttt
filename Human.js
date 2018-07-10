"use strict";
const Player = require("./Player.js");

class Human extends Player {
	constructor(name, marker) {
		super(name, marker);
	}

	setSquare(gameboard, squareId) {
		gameboard[squareId] = this.marker;
	}
}

module.exports = Human;
