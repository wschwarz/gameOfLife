
var fs = require('fs');
var _ = require('lodash');
var chalk = require('chalk');
var util = require('util');
var gameBoard = require('./board.js')();

function main(filename) {
	var inputBoardFile;

	if (typeof filename !== "undefined") {
		inputBoardFile = filename;
	} else {
		inputBoardFile = process.argv.slice(2)[0];
	}

	if (typeof inputBoardFile === "undefined") {
		inputBoardFile = '';

		process.stdin.setEncoding('utf8');

		process.stdin.on('readable', function() {
			var chunk = process.stdin.read();
			if (chunk !== null) {
				var trimmedChunk = _.trim(chunk);

				if (typeof trimmedChunk.length !== "undefined" && trimmedChunk.length > 0) {
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

		try {
			var inputBoard = fs.readFileSync(inputBoardFile, 'utf-8');
		} catch (ex) {
			console.trace(chalk.red(ex));
			return "Invalid File";
		}

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