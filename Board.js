class Board {
	constructor() {
		this.grid = [...Array(9).keys()];
	}

	getBoard() {
		return this.grid;
	}
}
