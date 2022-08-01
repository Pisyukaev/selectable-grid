export const getPointFromCell = (
  side: number,
  paddingSide: number,
  cellSize: number
) => {
  if (cellSize === 0) {
    return 0
  }

  return Math.floor((side - paddingSide) / cellSize) * cellSize + paddingSide
}
