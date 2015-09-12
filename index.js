/*

Game of Life

The input will be a game board of cells, either alive (1) or dead (0).

Next generation is created based on the following rules:

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
var _ = require('lodash');
var chalk = require('chalk');
var util = require('util');
var gameBoard = require('./libs/board')();

function main() {
	var inputBoardFile = process.argv.slice(2)[0];

	if (typeof inputBoardFile === "undefined") {
		inputBoardFile = '';

		process.stdin.setEncoding('utf8');

		process.stdin.on('readable', function() {
			var chunk = process.stdin.read();
			if (chunk !== null) {
				console.log(chunk);
				if (_.trim(chunk).length > 0) {
					inputBoardFile += chunk;
				}
			}
		});

		process.stdin.on('end', function() {
			if (typeof inputBoardFile === "undefined") {
				console.error("Please provide an input file");
				process.exit(0);
			}

			runGame(inputBoardFile);

		});

	} else {

		var inputBoard = fs.readFileSync(inputBoardFile, 'utf-8');

		runGame(inputBoard);
	}
}

function runGame(input) {
	try {
		gameBoard.initialize(input);

		console.log(chalk.yellow("Initial Board: "));
		console.log(chalk.yellow(util.inspect(gameBoard.getBoardState(), { 'depth': null })));

		gameBoard.newGeneration();

		console.log(chalk.green("New Generation Board: "));
		console.log(chalk.green(util.inspect(gameBoard.getBoardState(), { 'depth': null })));

	} catch (ex) {
		console.trace(chalk.red(ex));
		process.exit(0);
	}
}

module.exports = main;

main();

