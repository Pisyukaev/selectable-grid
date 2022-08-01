import React from 'react'

import { CanvasSize, Paddings } from '../types'

// set paddings for grid
export const useCanvasPaddings = ({
  canvasSize,
  cellSize
}: {
  canvasSize: CanvasSize
  cellSize: number
}) => {
  const [paddings, setPaddings] = React.useState<Paddings>({
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  })

  React.useEffect(() => {
    const { width, height } = canvasSize

    if (!width || !height) {
      return
    }

    const cellCountX = Math.floor(width / cellSize)
    const cellCountY = Math.floor(height / cellSize)

    const paddingX = width - cellCountX * cellSize
    const paddingY = height - cellCountY * cellSize

    const paddingTop = paddingY / 2
    const paddingLeft = paddingX / 2
    const paddingRight = paddingLeft
    const paddingBottom = paddingTop

    setPaddings({
      top: paddingTop,
      left: paddingLeft,
      right: paddingRight,
      bottom: paddingBottom
    })
  }, [canvasSize, cellSize])

  return paddings
}
