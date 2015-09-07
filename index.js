/*

Write some code that evolves generations through the "game of life".

The input will be a game board of cells, either alive (1) or dead (0).

The code should take this board and create a new board for the next generation based on the following rules:

1) Any live cell with fewer than two live neighbours dies (under- population)
2) Any live cell with two or three live neighbours lives on to the next generation (survival)

3) Any live cell with more than three live neighbours dies (overcrowding)
4) Any dead cell with exactly three live neighbours becomes a live cell (reproduction)

As an example, this game board as input:

01000
10011
11001
01000
10001

Will have a subsequent generation of:

00000
10111
11111
01000
00000

*/

var fs = require('fs');
var gameBoard = require('./libs/board')();

var inputBoardFile;

process.argv.forEach(function (val, index, array) {
	// console.log(index + ': ' + val);
	if (index == 2) { inputBoardFile = val; }
});

var inputBoard = fs.readFileSync(inputBoardFile, 'utf-8');


// console.log(inputBoard);

gameBoard.initialize(inputBoard);
gameBoard.newGeneration();

