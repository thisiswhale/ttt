"use strict";
const Human = require('./Human.js');
const Computer = require('./Computer.js');
const Tictactoe = require('./Tictactoe.js');

let test = new Tictactoe();
let p = new Human('human', 'x');
let ai = new Computer('name','o')

p.setSquare(test.getBoard(), 0);

p.setSquare(test.getBoard(), 1);

p.setSquare(test.getBoard(), 2);

console.log(test.hasTie())
console.log(test.isGameOver(p.isWinner(test.getBoard())))
// console.log(test.getBoard())
// console.log(p.isWinner(test.getBoard(), p.getData().marker))
// console.log(test.hasTie())


// test.isWinner() || test.hasTie
class initGame {
	constructor(setting) {
		this.board = new Tictactoe();
		this.player1 = new Human('Human1','x');
		if( setting =='computer'){
			this.player2 = new Computer('Computer', 'o');
		}
		else{
			this.player2 = new Human('Human2', 'o');
		}
	}
}
document.addEventListener("DOMContentLoaded", function(event) {
	let game = new Tictactoe();
	let grid = game.getBoard();

	let player1 = new Human('Human', 'x');
	let player2 = new Human('Human', 'o');
	let currPlayer;

	const squares = document.querySelectorAll('.cell');
	const controlSettings = document.querySelector('#control');
	const tableUI = document.querySelector('table');

	controlSettings.addEventListener('click', newGame);
	tableUI.addEventListener('click', humanTurn)

	function humanTurn(square){

    let selectCell = square.target;

			if(selectCell.className.includes('cell') &&
					typeof grid[selectCell.id] == 'number'){
				//Player 1 Human turn
				if(game.isPlayerOneTurn()){
					currPlayer = player1;
				}
				//Player 2 Human turn
				else if(!game.isPlayerOneTurn() && player2.name === 'Human'){
					currPlayer = player2;
				}
				viewSquare(selectCell.id, currPlayer);

				if(!isGameFinished(currPlayer)){
					game.setPlayerTurn();
				}


				// //Player 2 Computer turn
				// if (!game.isPlayerOneTurn() && player2.name === 'Computer'){
				// 	viewSquare(game.getComputerTurnId(player2), player2);
				// 	viewGameOver(player2);
				// }
    }
  }

	function viewSquare(squareId, player){
		player.setSquare(grid, squareId);
		let square = document.getElementById(squareId);
		square.innerText = player.marker;
		square.className += ' full';
	}

	function isGameFinished(player){

		let result = game.isGameOver(player.isWinner(grid));

		console.log(result,grid)
		if (typeof result === 'object'){
			result.index.forEach( index =>{
				squares[index].className += ' win';
			});
			return;
		}
		else if(typeof result ==='boolean' && result === true){
			squares.forEach( cell => {
				cell.className += ' tie';
			});
			return;
		}
		return false;
	}

	function newGame(event){
		game = new Tictactoe();
		grid = game.getBoard();
		const node = event.target.className;
		if(node.includes('mode'))	{
			//Removes grid classNames with full, win and tie.
			squares.forEach( cell => {
				cell.innerHTML ="";
				cell.className = cell.className.split(" ").filter(className =>
					className != 'full' && className !='win' && className != 'tie'
					).join(" ");
		 });
		}
	}



});
