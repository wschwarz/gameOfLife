#Game of Life

###Version 1.0

## Description:

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

## To Run:

	docker build -t game-of-life .
	docker run -ti --rm -P --name gof-instance game-of-life start input.txt

## To Test:

	docker build -t game-of-life .
	docker run -ti --rm -P --name gof-instance game-of-life test


## How to use:

Accepts a filename or a piped in file as well as stdin. Program will output the generated initial board state and automatically
process and output the new generation.


## Todo:

	1) check input - values - done
		a) check no newlines??
	2) Optimize the check operations
		a) Split into 3x3 squares and store total live pieces. We would need to do
		this (h-2)(w-2) times then we could look up the total and subtract 1 if our
		input is live. We're still essentially checking each place 8/9 times so no
		real speedup.
	3) Tests - bad input - done
	4) memoization
		We generate each new board state only once. We visit each board piece multiple
		 times but its O(1) lookup each time.
	5) malformed board?? - done (Defaults to value 0 if expected board position is
		missing since the rules care about live pieces)
	6) Remove console logs until main finishes - done