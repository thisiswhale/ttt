const Player = (name, marker) => {
	return {name, marker};
};

const Board = () => {
	let grid, turns, playerOneTurn;

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

	const checkWin = (grid, marker) => {
		//finds the index of the player's marker
		let markersPlay = grid.reduce((arr, gridIndexMarker, index) =>
				(gridIndexMarker === marker) ? arr.concat(index) : arr, []);
		let gameWon = null;
		//use winSets to compare markersPlay to find the winning combination
			for (let [index, thisSet] of winSets.entries()) {
				if (thisSet.every(el => markersPlay.indexOf(el) > -1)) {
					gameWon = { index, marker};
					break;
				}
			}
		return gameWon;
	}

	const minimax = (newGrid, computerMarker) =>{
		let availSpots = newGrid.filter(cell => cell != 'x' && cell != 'o');
		/*checks for the terminal states such as win, lose,
		 *and tie and returning a value accordingly
		 */
		if (checkWin(newGrid, 'x')) {
			return {score: -10};
		} else if (checkWin(newGrid, 'o')) {
			return {score: 10};
		} else if (availSpots.length === 0) {
			return {score: 0};
		}
		// an array to collect all the objects
		let moves = [];
		// loop through available spots
		for (let i = 0; i < availSpots.length; i++) {
			/*create an object for each and store the index
			 *of that spot that was stored as a number in
			 *the object's index key
			 */
			let move = {};
			move.index = newGrid[availSpots[i]];
			// set the empty spot to the current player
			newGrid[availSpots[i]] = computerMarker;
			/*if collect the score resulted from calling minimax
			 *on the opponent of the current player (recursion)
			 */
			if (computerMarker == 'o') {
				let result = minimax(newGrid, 'x');
				move.score = result.score;
			} else {
				let result = minimax(newGrid, 'o');
				move.score = result.score;
			}
			//reset the spot to empty
			newGrid[availSpots[i]] = move.index;
			// push the object to the array
			moves.push(move);
		}
		/*If it is the computer's turn loop over the moves
		 *and choose the move with the highest score
		 */
		let bestMove;
		if (computerMarker === 'o') {
			let bestScore = -10000;
			for (let i = 0; i < moves.length; i++) {
				if (moves[i].score > bestScore) {
					bestScore = moves[i].score;
					bestMove = i;
				}
			}
		} else {
			// else loop over the moves and choose the move with the lowest score
			let bestScore = 10000;
			for (let i = 0; i < moves.length; i++) {
				if (moves[i].score < bestScore) {
					bestScore = moves[i].score;
					bestMove = i;
				}
			}
		}
		// return the chosen move (object) from the array to the higher depth
		return moves[bestMove];
	}

	let handlers = {
		resetGame : () => {
		 grid = [...Array(9).keys()];
		 turns = grid.length;
		 playerOneTurn = true;
	 	},
		getBoard: () => {
			return grid;
		},
		isPlayer1Turn: () => {
			return playerOneTurn;
		},
    //updates the grid array, display marker indicator to DOM, subtract turn
		markSquare: (squareId, player) => {
			grid[squareId] = player.marker;
			turns--;
		},
    //switch players
    changePlayer: () => {
      playerOneTurn = !playerOneTurn;
    },
    //returns AI best move based on grid array
		getComputerTurnId: computer =>{
			 let bestMove = minimax(grid, computer.marker);
			 grid[bestMove.index] = computer.marker;
			 return bestMove.index;
		},
		//returns an object of the Winner, else is null
    isWinner: player => {
			return	checkWin(grid,player.marker);
    },
		isGameOver: result => {
			let gameOver;
       //returns an array of winSet[index]
			if(result) gameOver = winSets[result.index];
      //returns 'draw'
			else if(turns === 0) gameOver =  'draw';
      //returns nothing
			else gameOver = false;

			return gameOver;
		}
	};
  return handlers;
};

//START THE GAME
const startGame =  (isComputer) => {
	let player1 = Player('Player1', 'x');
	let player2;

	if(!isComputer) player2 = Player('Player2', 'o');
	else player2 = Player('Computer', 'o');

	let board = Board();
	board.resetGame();

	let squares = document.querySelectorAll('.cell');
	let controlSettings = document.querySelector('#control');
	let tableUI = document.querySelector('table');

	const reset = event =>{
		let setting = event.target.className;
			if(setting.includes('mode'))	{
				//Removes grid classNames with full, win and tie.
				squares.forEach( cell => {
	 				cell.innerHTML ="";
	 				let resetClassName = cell.className.split(" ").filter(className =>
	 					className != 'full' && className !='win' && className != 'tie'
	 					).join(" ");
	 				cell.className = resetClassName;
	 		 });
				board.resetGame();}
	}
	controlSettings.addEventListener('click', reset);

	const humanTurn = square => {
    let selectCell = square.target;

			if(selectCell.className.includes('cell') &&
					typeof board.getBoard()[selectCell.id] == 'number'){
				//Player 1 Human turn
				if(board.isPlayer1Turn()){
					viewSquare(selectCell.id, player1);
					viewGameOver(player1);
				}
				//Player 2 Human turn
				else if(!board.isPlayer1Turn() && player2.name === 'Player2'){
					viewSquare(selectCell.id, player2);
					viewGameOver(player2);
				}
				//Player 2 Computer turn
				if (!board.isPlayer1Turn() && player2.name === 'Computer'){
					viewSquare(board.getComputerTurnId(player2), player2);
					viewGameOver(player2);
				}
    }
  }
	//Add onclick eventlistener to the table
	tableUI.onclick = humanTurn;

	const viewSquare = (squareId, player) =>{
		board.markSquare(squareId, player);
		let square = document.getElementById(squareId);
		square.innerText = player.marker;
		square.className += ' full';
	}

	const viewGameOver = (player) =>{
		if(board.isGameOver(board.isWinner(player))){
			let result =board.isGameOver(board.isWinner(player));
			if(result !== 'draw' ){
				result.forEach( index =>{
					squares[index].className += ' win';
				});
			}
			else {
				squares.forEach( cell => {
					cell.className += ' tie';
				});
			}
			tableUI.onclick = "";
		}
		else{
			board.changePlayer();
		}
	}

}

module.exports = {Player, Board};
