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
var main = require('./libs/main.js');

main();

