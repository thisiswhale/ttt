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
