The [React tic-tac-toe tutorial](https://reactjs.org/tutorial/tutorial.html) code, tweaked to play Jason's Game (a.k.a. Tic Tac Go!).

## The Rules

Here are some rules:

1. Each player has 18 square or rectangle playing pieces in contrasting colors or patterns
2. Pieces are played on a 6x6 grid, defined by the players as they play
3. Pieces after the first one must be played aligned with and touching at least one other card in play (touching corners is fine)
4. First turn, first player plays 2 pieces, then the second player plays 2 pieces
5. After the first turn, players alternate playing one piece at a time
6. Play continues until all pieces have been played into the 6x6 grid
7. At no time can a piece be played that will create a grid larger than 6x6


Win the game by earning the most points, added together after all pieces are played. 
Pieces can be counted for more than one row, but not as a subset of a larger row.

Scoring:

* 3 in a row, like tic tac toe: 1 point
* 4 in a row, like connect four: 2 points
* 5 in a row, like five golden rings: 5 points (!)

Exception: if a player lines up 6 in a row, they win immediately

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).