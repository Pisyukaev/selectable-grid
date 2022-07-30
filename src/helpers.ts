export const getPointFromCell = (
  side: number,
  paddingSide: number,
  cellSize: number
) => Math.floor((side - paddingSide) / cellSize) * cellSize + paddingSide
