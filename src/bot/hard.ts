export const getHardMove = (squares: (string | null)[]): number | null => {
  const emptyIndices = squares
    .map((sq, idx) => (sq === null ? idx : null))
    .filter((idx) => idx !== null) as number[];

  let bestMove = null;
  let bestScore = -Infinity;

  for (let index of emptyIndices) {
    squares[index] = 'O';
    const score = minimax(squares, 0, false);
    squares[index] = null;

    if (score > bestScore) {
      bestScore = score;
      bestMove = index;
    }
  }

  return bestMove;
};

const minimax = (squares: (string | null)[], depth: number, isMaximizing: boolean): number => {
  const winner = calculateWinner(squares)?.winner;
  if (winner === 'O') return 10 - depth;
  if (winner === 'X') return depth - 10;
  if (squares.every((sq) => sq !== null)) return 0;

  const emptyIndices = squares
    .map((sq, idx) => (sq === null ? idx : null))
    .filter((idx) => idx !== null) as number[];

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let index of emptyIndices) {
      squares[index] = 'O';
      const score = minimax(squares, depth + 1, false);
      squares[index] = null;
      bestScore = Math.max(score, bestScore);
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let index of emptyIndices) {
      squares[index] = 'X';
      const score = minimax(squares, depth + 1, true);
      squares[index] = null;
      bestScore = Math.min(score, bestScore);
    }
    return bestScore;
  }
};

const calculateWinner = (squares: (string | null)[]) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a, b, c] };
    }
  }

  return { winner: null, line: [] };
};
