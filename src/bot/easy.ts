import { getEmptyIndices } from './util'

export const getEasyMove = (squares: (string | null)[]): number | null => {
  const emptyIndices = getEmptyIndices(squares)

  if (emptyIndices.length === 0) return null

  return emptyIndices[Math.floor(Math.random() * emptyIndices.length)]
}
