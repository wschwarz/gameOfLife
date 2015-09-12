var _ = require('lodash');

module.exports = function() {
	var board = new Array();
	var maxRows = 0;
	var maxCols = 0;

	/* Thought this might be faster but it would actually be the same thing since we're still doing 9 operations per space
	possible small differences but shouldn't be enough to matter.
	function improvedCheck() {
		// Generate new board of live totals
		var newBoard = new Array(maxRows - 2);
		_.forEach(board, function(row, rowIndex) {
			newBoard[rowIndex] = new Array(maxCols - 2);
			_.forEach(row, function(col, colIndex) {
				if (getBoardValue(rowIndex, colIndex) == 1) {
					//Add 1 to each neighbor
				}
			})
		})
	}*/

	function checkLiveNeighbors(row, col) {
		// 8 possible neighbors
		var liveNeighbors = 0;
		if (row - 1 >= 0) { liveNeighbors += checkCols(row - 1, col); }
		liveNeighbors += checkCols(row, col, true);

		//small speedup since we don't care about more than 4
		if (liveNeighbors > 3) return liveNeighbors;

		if (row + 1 < maxRows) { liveNeighbors += checkCols(row + 1, col); }
		return liveNeighbors;
	}

	function checkCols(row, col, skipSelf) {
		var liveNeighbors = 0;
		if (col - 1 >= 0) { liveNeighbors += getBoardValue(row, col - 1); }
		if (!skipSelf) { liveNeighbors += getBoardValue(row, col); }
		if (col + 1 < maxCols) { liveNeighbors += getBoardValue(row, col + 1); }
		return liveNeighbors;
	}

	function getBoardValue(row, col) {
		if (typeof board[row][col] === "undefined") { return 0; }
		else { return board[row][col]; }
	}

	/* Rule Checks */
	function amIAlive(state, liveNeighbors) {
		if (state && liveNeighbors < 2) { return 0; } //dies
		if (state && liveNeighbors >= 2 && liveNeighbors <= 3) { return 1; } //survival
		if (state && liveNeighbors > 3) { return 0; } //overcrowding
		if (!state && liveNeighbors == 3) { return 1; } //repopulation
		if (!state && liveNeighbors != 3) { return 0; } //other
	}
	/* end Rule Checks */

	return {
		initialize: function(inputBoardState) {
			var lines = inputBoardState.split('\n');
			_.map(lines, function(line, index) {
				if (line.length == 0) { return; }
				board[index] = _.map(line.split(""), function(n) {
					var val = parseInt(n);
					if (!(val === 0 || val === 1)) {
						throw new Error("Input invalid.");
					}
					return val;
				});
			});
			maxRows = board.length;
			maxCols = board[0].length;
			return true;
		},

		getBoardState: function() {
			return board;
		},

		newGeneration: function() {
			var newGeneration = new Array(maxRows);

			_.forEach(board, function(row, rowIndex) {
				newGeneration[rowIndex] = new Array(board[rowIndex].length);
				_.forEach(row, function(col, colIndex) {
					var liveNeighbors = checkLiveNeighbors(rowIndex, colIndex);
					newGeneration[rowIndex][colIndex] = amIAlive(col, liveNeighbors);
				});
			});

			board = newGeneration;

			return newGeneration;
		}
	}
}