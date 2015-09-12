'use strict';

var chai = require('chai');
var expect = require('chai').expect;
var should = require('chai').should();


describe('Testing Setup', function() {
	it('true is true', function() {
		expect(true).to.be.true;
	});
});

describe('Board Lib', function () {
	var board,
		testBoardInstance;

	before(function() {
		board = require('./../libs/board')();
		var inputBoard = "01000\n10011\n11001\n01000\n10001";
		testBoardInstance = require('./../libs/board')();
		testBoardInstance.initialize(inputBoard);
	});

	it('returns functions', function() {
		expect(board.initialize).to.be.instanceof(Function);
		expect(board.newGeneration).to.be.instanceof(Function);
		expect(board.getBoardState).to.be.instanceof(Function);
	});

	it('initialize', function() {
		var inputBoard = "010001\n100110\n110010\n010001\n100011";
		var boardInstance = board.initialize(inputBoard);
		expect(boardInstance).to.be.true;
	});

	it('getBoardState', function() {
		var newInstance = testBoardInstance.getBoardState();
		expect(newInstance).to.be.ok;
		expect(newInstance).to.have.length(5);
	});

	it('generates new generation', function() {
		var newGen = testBoardInstance.newGeneration();
		expect(newGen).to.be.ok;
		expect(newGen).to.have.length(5);
		var newGenExpectedResult = [[0,0,0,0,0], [1,0,1,1,1], [1,1,1,1,1], [0,1,0,0,0], [0,0,0,0,0]];
		expect(newGen).to.deep.equal(newGenExpectedResult);
	});

	it('throws error on bad input', function() {
		var inputBoard = "010001\n100110\n110010\n010001\n100012";
		var newBoard = require('./../libs/board')();
		expect(newBoard.initialize.bind(newBoard, inputBoard)).to.throw(Error, /Input invalid./);
	});

	it('handles malformed board', function() {
		var inputBoard = "010001\n100110\n1010\n010001\n1010";
		var newBoard = require('./../libs/board')();
		var boardCreated = newBoard.initialize(inputBoard);
		var newGen = newBoard.newGeneration();
		var newGenExpectedResult = [[0,0,0,0,1,0], [1,0,1,1,1,0],[1,0,1,1],[1,0,1,0,0,0],[0,1,0,0]];
		expect(newGenExpectedResult).to.deep.equal(newGen);
	});
});