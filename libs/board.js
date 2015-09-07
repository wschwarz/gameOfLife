var _ = require('lodash');

module.exports = function() {
	var board = new Array();

	function checkLiveNeighbors(row, col) {
		return 2;
	}

	return {
		initialize: function(inputBoardState) {
			var lines = inputBoardState.split('\n');
			_.map(lines, function(line, index) {
				board[index] = line.split("");
			});
		},

		newGeneration: function() {
			console.log(board);
			_.forEach(board, function(row, rowIndex) {
				console.log(rowIndex);
				console.log(row);
				_.forEach(row, function(col, colIndex) {
					console.log(rowIndex + '-' + colIndex);
					var liveNeighbors = checkLiveNeighbors(rowIndex, colIndex);
				});
			});
		}
	}
}