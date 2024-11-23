import { lines } from "../game"

export const getMediumMove = (squares: (string | null)[]): number | null => {

  const getBestMove = (player: string): number | null => {
    for (let [a, b, c] of lines) {
      const values = [squares[a], squares[b], squares[c]];
      if (values.filter((v) => v === player).length === 2 && values.includes(null)) {
        return [a, b, c].find((idx) => squares[idx] === null)!;
      }
    }
    return null;
  };

  const emptyIndices = squares
    .map((sq, idx) => (sq === null ? idx : null))
    .filter((idx) => idx !== null) as number[];

  return getBestMove('O') || getBestMove('X') || emptyIndices[0];
};
