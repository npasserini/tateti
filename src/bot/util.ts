export const getEmptyIndices = (squares: (string | null)[]) =>
  squares
    .map((sq, idx) => (sq === null ? idx : null))
    .filter((idx) => idx !== null) as number[];
