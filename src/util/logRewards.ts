import { Squares } from '../game/board'

/**
 * Renderiza el tablero de tatetí en la consola con colores según las recompensas.
 * @param {('X' | 'O' | null)[]} squares - Array de 9 elementos con 'X', 'O' o null.
 * @param {number[]} targets - Array de 9 números representando las recompensas.
 */
const logRewards = (squares: Squares, targets: number[]) => {
  const messages = []
  const styles = []

  for (let i = 0; i < 9; i++) {
    const square = squares[i] || ' '
    const reward = targets[i]

    // Determinar el color de fondo según la recompensa
    let backgroundColor = 'white' // Por defecto, sin color

    if (reward > 0) {
      // Recompensa positiva - verde pastel
      backgroundColor = 'hsl(120, 100%, 90%)' // Verde claro
    } else if (reward < 0) {
      // Recompensa negativa - rojo pastel
      backgroundColor = 'hsl(0, 100%, 90%)' // Rojo claro
    } // Si es 0, dejamos el fondo blanco

    // Crear el estilo para esta celda
    const style = `background: ${backgroundColor}; color: black; font-weight: bold; padding: 5px; border: 1px solid #ccc;`

    // Agregar el mensaje y el estilo
    messages.push(`%c ${square} `)
    styles.push(style)

    // Agregar una nueva línea después de cada 3 celdas
    if ((i + 1) % 3 === 0 && i !== 8) {
      messages.push('%c\n')
      styles.push('')
    }
  }

  // Unir los mensajes y estilos y mostrarlos en la consola
  console.log(messages.join(''), ...styles)
}

export default logRewards
