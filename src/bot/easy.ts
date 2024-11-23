export const getEasyMove = (squares: (string | null)[]): number | null => {
  const emptyIndices = squares
    .map((sq, idx) => (sq === null ? idx : null))
    .filter((idx) => idx !== null) as number[];

  if (emptyIndices.length === 0) return null;

  return emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
};
