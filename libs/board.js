var _ = require('lodash');

module.exports = function() {
	var board = new Array();
	var maxRows = 0;
	var maxCols = 0;

	function checkLiveNeighbors(row, col) {
		// 9 possible neighbors
		// TODO: return if we know we don't have to check anymore
		var liveNeighbors = 0;
		if (row - 1 >= 0) { liveNeighbors += checkCols(row - 1, col); }
		liveNeighbors += checkCols(row, col, true);
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

	function amIAlive(state, liveNeighbors) {
		if (state && liveNeighbors < 2) { return 0; } //dies
		if (state && liveNeighbors >= 2 && liveNeighbors <= 3) { return 1; } //survival
		if (state && liveNeighbors > 3) { return 0; } //overcrowding
		if (!state && liveNeighbors == 3) { return 1; } //repopulation
		if (!state && liveNeighbors != 3) { return 0; } //other
	}

	return {
		initialize: function(inputBoardState) {
			var lines = inputBoardState.split('\n');
			_.map(lines, function(line, index) {
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

			return newGeneration;
		}
	}
}