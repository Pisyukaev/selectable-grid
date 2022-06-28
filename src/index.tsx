import * as React from 'react'

import {
  useCanvasResolution,
  useCanvasPaddings,
  useCanvasStyles,
  useMouseCallbacks
} from './hooks'
import { Size, Point, SelectableArea } from './types'
import styles from './styles.module.css'

// eslint-disable-next-line @typescript-eslint/no-empty-function
const NOOP = () => {}

const GRID_STYLES = {
  strokeStyle: 'blue',
  lineDashOffset: 0,
  lineDash: [5, 5]
}

const SELECT_AREA_STYLES = {
  strokeStyle: 'red',
  fillStyle: 'rgba(100,0,0,0.3)',
  lineDash: [0, 0]
}

const CELLS_STYLES = {
  strokeStyle: 'red',
  fillStyle: 'rgba(100,0,0,0.3)'
}
interface Props {
  containerSize?: Size
  imgSize?: Size
  cellSize?: number
  onMouseDown?: (e: React.MouseEvent, startDownPosition: Point) => void
  onMouseMove?: (e: React.MouseEvent, area: SelectableArea) => void
  onMouseUp?: (e: React.MouseEvent, area: SelectableArea) => void
  gridStyles?: {
    strokeStyle?: CanvasFillStrokeStyles['strokeStyle']
    lineDashOffset?: CanvasPathDrawingStyles['lineDashOffset']
    lineDash?: number[]
  }
  selectAreaStyles?: {
    strokeStyle?: CanvasFillStrokeStyles['strokeStyle']
    fillStyle?: CanvasFillStrokeStyles['fillStyle']
    lineDash?: number[]
  }
  cellsStyles?: {
    strokeStyle?: CanvasFillStrokeStyles['strokeStyle']
    fillStyle?: CanvasFillStrokeStyles['fillStyle']
  }
}

const CELL_OFFSET = 5

export const SelectableGrid = ({
  containerSize,
  imgSize,
  cellSize = 30,
  onMouseDown = NOOP,
  onMouseMove = NOOP,
  onMouseUp = NOOP,
  gridStyles = GRID_STYLES,
  selectAreaStyles = SELECT_AREA_STYLES,
  cellsStyles = CELLS_STYLES
}: Props) => {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null)
  const canvasSize = useCanvasResolution({ containerSize, imgSize })
  const canvasStyles = useCanvasStyles({ containerSize, canvasSize })
  const paddings = useCanvasPaddings({ canvasSize, cellSize })
  const {
    isDrag,
    area,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    startPoint
  } = useMouseCallbacks({ onMouseDown, onMouseMove, onMouseUp })

  const drawGrid = React.useCallback(() => {
    if (!canvasRef.current) {
      return
    }

    const ctx = canvasRef.current.getContext('2d')

    if (!ctx) {
      return
    }

    const { width, height } = canvasSize
    const { top, left, right, bottom } = paddings

    ctx.clearRect(0, 0, width, height)

    ctx.strokeStyle = gridStyles.strokeStyle || GRID_STYLES.strokeStyle
    ctx.setLineDash(gridStyles.lineDash || GRID_STYLES.lineDash)
    ctx.lineDashOffset = gridStyles.lineDashOffset || GRID_STYLES.lineDashOffset

    ctx.beginPath()

    for (let x = left; x <= width - right; x += cellSize) {
      ctx.moveTo(x, top)
      ctx.lineTo(x, height - bottom)
    }

    for (let y = top; y <= height - bottom; y += cellSize) {
      ctx.moveTo(left, y)
      ctx.lineTo(width - right, y)
    }

    ctx.stroke()
  }, [canvasSize, paddings, gridStyles, cellSize])

  const drawSelectArea = React.useCallback(() => {
    if (!canvasRef.current) {
      return
    }

    const ctx = canvasRef.current.getContext('2d')

    if (!ctx) {
      return
    }

    ctx.strokeStyle =
      selectAreaStyles.strokeStyle || SELECT_AREA_STYLES.strokeStyle
    ctx.fillStyle = selectAreaStyles.fillStyle || SELECT_AREA_STYLES.fillStyle
    ctx.setLineDash(selectAreaStyles.lineDash || SELECT_AREA_STYLES.lineDash)

    const { x, y, w, h } = area

    ctx.strokeRect(x, y, w, h)
    ctx.fillRect(x, y, w, h)
  }, [area, selectAreaStyles])

  const fillCells = React.useCallback(() => {
    if (!canvasRef.current) {
      return
    }

    const ctx = canvasRef.current.getContext('2d')

    if (!ctx) {
      return
    }

    if (!startPoint) {
      return
    }

    ctx.strokeStyle = cellsStyles.strokeStyle || CELLS_STYLES.strokeStyle
    ctx.fillStyle = cellsStyles.fillStyle || CELLS_STYLES.fillStyle

    const { x, y, w, h } = area
    const { top, left } = paddings

    const startX = Math.floor((x - left) / cellSize)
    const endX = Math.ceil((x + w - left) / cellSize)
    const startY = Math.floor((y - top) / cellSize)
    const endY = Math.ceil((y + h - top) / cellSize)

    const countX = endX - startX
    const countY = endY - startY

    for (let cellX = 0; cellX < countX; cellX += 1) {
      for (let cellY = 0; cellY < countY; cellY += 1) {
        const positionX =
          Math.floor((x + cellSize * cellX - left) / cellSize) * cellSize +
          left +
          CELL_OFFSET / 2

        const positionY =
          Math.floor((y + cellSize * cellY - top) / cellSize) * cellSize +
          top +
          CELL_OFFSET / 2

        ctx.clearRect(
          positionX,
          positionY,
          cellSize - CELL_OFFSET,
          cellSize - CELL_OFFSET
        )
        ctx.fillRect(
          positionX,
          positionY,
          cellSize - CELL_OFFSET,
          cellSize - CELL_OFFSET
        )
      }
    }
  }, [startPoint, cellsStyles, area, paddings, cellSize])

  // all draws
  React.useEffect(() => {
    if (!canvasRef.current) {
      return
    }

    const ctx = canvasRef.current.getContext('2d')

    if (!ctx) {
      return
    }

    ctx.clearRect(0, 0, canvasSize.width, canvasSize.height)

    drawGrid()
    fillCells()
    if (isDrag) {
      drawSelectArea()
    }
  }, [canvasSize, isDrag, drawGrid, fillCells, drawSelectArea])

  if (!containerSize || !imgSize) {
    return null
  }

  return (
    <canvas
      ref={canvasRef}
      className={styles.canvas}
      style={{ ...canvasStyles }}
      width={canvasSize.width}
      height={canvasSize.height}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    />
  )
}
