class Move
{
	constructor()
	{
		let row,col;
	}
}

function isMovesLeft(grid)
{
	for(let i = 0; i < DIM; i++)
		for(let j = 0; j < DIM; j++)
			if (grid[i][j] == 0)
				return true;
				
	return false;
}
function evaluate(b)
{
	
	// Checking for Rows for X or O victory.
	for(let row = 0; row < DIM; row++)
	{
		if (b[row][0] == b[row][1] &&
			b[row][1] == b[row][2])
		{
			if (b[row][0] == AI)
				return +10;
				
			else if (b[row][0] == human)
				return -10;
		}
	}

	// Checking for Columns for X or O victory.
	for(let col = 0; col < DIM; col++)
	{
		if (b[0][col] == b[1][col] &&
			b[1][col] == b[2][col])
		{
			if (b[0][col] == AI)
				return +10;

			else if (b[0][col] == human)
				return -10;
		}
	}

	// Checking for Diagonals for X or O victory.
	if (b[0][0] == b[1][1] && b[1][1] == b[2][2])
	{
		if (b[0][0] == AI)
			return +10;
			
		else if (b[0][0] == human)
			return -10;
	}

	if (b[0][2] == b[1][1] &&
		b[1][1] == b[2][0])
	{
		if (b[0][2] == AI)
			return +10;
			
		else if (b[0][2] == human)
			return -10;
	}

	return 0;
}

function minimax(grid, depth, isMax)
{
	let score = evaluate(grid);

	// If Maximizer has won the game
	// return his/her evaluated score
	if (score == 10)
		return score-depth;

	if (score == -10)
		return score+depth;

	if (isMovesLeft(grid) == false)
		return 0;

	// If this maximizer's move
	if (isMax)
	{
		let best = -1000;

		// Traverse all cells
		for(let i = 0; i < DIM; i++)
		{
			for(let j = 0; j < DIM; j++)
			{
				
				// Check if cell is empty
				if (grid[i][j]==0)
				{
					//Make the move
					grid[i][j] = AI;

					//Call minimax recursively
					//and choose the maximum value
					
                    best = Math.max(best, minimax(grid,
									depth + 1, !isMax));

					// Undo the move
					grid[i][j] = 0;
				}
			}
		}
		return best;
	}

	// If this minimizer's move
	else
	{
		let best = 1000;

		// Traverse all cells
		for(let i = 0; i < DIM; i++)
		{
			for(let j = 0; j < DIM; j++)
			{
				
				// Check if cell is empty
				if (grid[i][j] == 0)
				{
					
					// Make the move
					grid[i][j] = human;

					// Call minimax recursively and
					// choose the minimum value
					best = Math.min(best, minimax(grid,
									depth + 1, !isMax));

					// Undo the move
					grid[i][j] = 0;
				}
			}
		}
		return best;
	}
}

// This will return the best possible
// move for the AI
function findBestMove(grid)
{
	let bestVal = -1000;
	let bestMove = new Move();
	bestMove.row = -1;
	bestMove.col = -1;

	// Traverse all cells, evaluate
	// minimax function for all empty
	// cells. And return the cell
	// with optimal value.
	for(let i = 0; i < DIM; i++)
	{
		for(let j = 0; j < DIM; j++)
		{
			
			// Check if cell is empty
			if (grid[i][j] == 0)
			{
				
				// Make the move
				grid[i][j] = AI;

				// compute evaluation function
				// for this move.
				let moveVal = minimax(grid, 0, false);

				// Undo the move
				grid[i][j] = 0;

				// If the value of the current move
				// is more than the best value, then
				// update best
				if (moveVal > bestVal)
				{
					bestMove.row = i;
					bestMove.col = j;
					bestVal = moveVal;
				}
			}
		}
	}
    let index = bestMove.col + bestMove.row * DIM;
    grid[bestMove.row][bestMove.col] = 2;
    console.log("INDEX : "+index);
	return index;
}
