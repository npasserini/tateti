export const logProbabilities = (probabilities: Uint8Array | Float32Array | Int32Array) => {
  const probabilitiesArray = Array.from(probabilities)

  // Encontrar la probabilidad máxima y mínima para normalizar
  const maxProb = Math.max(...probabilitiesArray);
  const minProb = Math.min(...probabilitiesArray);

  const messages = [];
  const styles = [];

  for (let i = 0; i < 9; i++) {
    const prob = probabilitiesArray[i];
    const normalizedProb = (prob - minProb) / (maxProb - minProb);

    // Mapear la probabilidad normalizada a un tono de color de rojo (0) a verde (120)
    const hue = normalizedProb * 120; // 0 (rojo) a 120 (verde)

    // Usar tonos pastel con alta luminosidad, por ejemplo, 85%
    const lightness = 85;

    const color = `hsl(${hue}, 100%, ${lightness}%)`;

    // Formatear el número
    const probString = prob.toFixed(3);

    // Agregar el mensaje y el estilo
    messages.push(`%c ${probString} `);
    styles.push(`background: ${color}; color: #000; ${prob === maxProb ? 'font-weight: bold;' : ''}`);

    // Agregar una nueva línea después de cada 3 celdas
    if ((i + 1) % 3 === 0 && i !== 8) {
      messages.push('\n');
    }
  }

  // Unir los mensajes y estilos
  console.log(messages.join(''), ...styles);
};
