import * as tf from '@tensorflow/tfjs'
import { getEmptyIndices } from './util'
import { BoardType } from '../game'
import { logProbabilities } from '../util'

let model: tf.LayersModel | null = null

/**
 * Crear un modelo no entrenado para el tatetí.
 * Entrada: Estado del tablero (9 valores).
 * Salida: Probabilidades para cada celda.
 */
const createModel = (): tf.LayersModel => {
  const newModel = tf.sequential()
  newModel.add(tf.layers.dense({ units: 128, activation: 'relu', inputShape: [9] }))
  newModel.add(tf.layers.dense({ units: 128, activation: 'relu' }))
  newModel.add(tf.layers.dense({ units: 9, activation: 'softmax' }))
  newModel.compile({
    optimizer: tf.train.adam(0.01),
    loss: 'meanSquaredError',
  })
  return newModel
}

/**
 * Inicializar el modelo de IA.
 */
export const initializeModel = async (): Promise<void> => {
  if (!model) {
    model = createModel()
  }
}

/**
 * Obtener el movimiento de la IA.
 * @param boardState Estado del tablero como array de números.
 * @returns Índice del movimiento.
 */
export const getMLMove = async (squares: BoardType): Promise<number | null> => {
  if (!model) {
    throw new Error('El modelo no está inicializado')
  }

  const boardState = squares.map(sq => (sq === 'X' ? 1 : sq === 'O' ? -1 : 0))
  const inputTensor = tf.tensor2d([boardState])
  const prediction = model.predict(inputTensor) as tf.Tensor
  const probabilities = prediction.dataSync() // Probabilidades para cada celda
  const emptyIndices = getEmptyIndices(squares)

  // Seleccionar la celda con mayor probabilidad disponible
  const availableMoves = emptyIndices.map(idx => ({ idx, prob: probabilities[idx!] }))
  const bestMove = availableMoves.sort((a, b) => b.prob - a.prob)[0]

  logProbabilities(probabilities)

  return bestMove.idx!
}

/**
 * Entrenar el modelo basado en el resultado.
 * @param trainingData Estados del tablero.
 * @param targetData Recompensas para cada celda.
 */
export const trainModel = async (trainingData: number[][], targetData: number[][]): Promise<void> => {
  if (!model) {
    throw new Error('El modelo no está inicializado')
  }

  const inputs = tf.tensor2d(trainingData)
  const targets = tf.tensor2d(targetData)
  await model.fit(inputs, targets, { epochs: 10 })
}
