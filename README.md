#Game of Life

###Version 1.0

## To Run

	docker build -t game-of-life .
	docker run -ti --rm -P --name gof-instance game-of-life start input.txt


## Todo:

1) check input - values - done
	a) check no newlines??
2) Optimize the check operations
3) Tests - bad input - done
4) memoization
5) malformed board?? - done
6) Remove console logs until main finishes - done