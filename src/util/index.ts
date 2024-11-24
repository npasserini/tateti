export const formatProbabilities = (probabilities: Uint8Array | Float32Array | Int32Array) => {
  // Formatear cada probabilidad con tres dígitos después de la coma
  const formattedProbs = Array.from(probabilities).map((prob) => prob.toFixed(3));

  // Agrupar las probabilidades en tres filas
  const rows = [];
  for (let i = 0; i < 9; i += 3) {
    const row = formattedProbs.slice(i, i + 3).join(' | ');
    rows.push(row);
  }

  // Unir las filas con saltos de línea
  const boardString = rows.join('\n');

  return boardString;
};
