"use strict";
const Human = require('./Human.js');
const Computer = require('./Computer.js');
const Tictactoe = require('./Tictactoe.js');

document.addEventListener("DOMContentLoaded", function(event) {

	const tableUI = document.querySelector('table');
	const squares = document.querySelectorAll('.cell');

	const controlSettings = document.querySelector('#control');
	controlSettings.onclick = newGame;

	let player1 = new Human('Human', 'x');
	let player2;
	let currPlayer;

	let game;
	let grid;
	let currMode;

	newGame();

	function newGame(event) {

		game = new Tictactoe();
		grid = game.getBoard();

		if (event === undefined) {
			setMode();
		} else {
			const node = event.target;
			//set game to play against human or computer
			setMode(node.id);
			displayReset(node.className);
		}
	}

	function setMode(selection) {
		if (selection === 'computer') {

			player2 = new Computer('Computer', 'o')
			currMode = againstComputer;

		} else {

			player2 = new Human('Human', 'o');
			currMode = againstHuman;

		}
		tableUI.onclick = currMode;
	}

	function againstHuman(square) {

		let selectCell = square.target;
		if (selectCell.className.includes('cell') && typeof grid[selectCell.id] == 'number') {

			currPlayer = getPlayerTurn();
			currPlayer.setSquare(grid, selectCell.id);
			displaySquare(currPlayer, selectCell.id);

			if (!isGameFinished(currPlayer)) {
				game.nextPlayerTurn();
			}
		}
	}

	function againstComputer(square) {

		let selectCell = square.target;
		if (selectCell.className.includes('cell') && typeof grid[selectCell.id] == 'number') {

			currPlayer = getPlayerTurn();
			currPlayer.setSquare(grid, selectCell.id);
			displaySquare(currPlayer, selectCell.id);

			if (!isGameFinished(currPlayer)) {
				game.nextPlayerTurn();
				currPlayer = getPlayerTurn();
				AiMove(currPlayer);
			}
		}
	}

	function AiMove(computer) {

		computer.setSquare(grid);
		displaySquare(computer, computer.getMove());

		if (!isGameFinished(computer)) {
			game.nextPlayerTurn();
		}
	}

	function getPlayerTurn() {
		return game.isPlayerOneTurn() ? player1 : player2;
	}

	function displaySquare(player, squareId) {

		let square = document.getElementById(squareId);

		square.innerText = player.marker;
		square.className += ' full';
	}

	function isGameFinished(player) {
		//expects an object of winner or a boolean value
		let result = game.isGameOver(player.isWinner(grid));

		if (typeof result === 'object') {
			displayWin(result);
			tableUI.onclick = "";
			return;

		} else if (typeof result === 'boolean' && result === true) {
			displayTie();
			return;

		}
		return false;
	}

	function displayWin(winner) {
		winner.index.forEach(index => {
			squares[index].className += ' win';
		});
	}

	function displayTie() {
		squares.forEach(cell => {
			cell.className += ' tie';
		});
	}

	function displayReset(node) {
		//Removes full, win, and tie class in the grid
		if (node.includes('mode')) {
			squares.forEach(cell => {
				cell.innerHTML = "";
				cell.className = cell.className.split(" ").filter(className => className != 'full' && className != 'win' && className != 'tie').join(" ");
			});
		}
	}

});
