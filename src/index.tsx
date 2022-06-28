import * as React from 'react'

import {
  useCanvasResolution,
  useCanvasPaddings,
  useCanvasStyles
} from './hooks'
import { Size, Point, Rect } from './types'
import styles from './styles.module.css'

// eslint-disable-next-line @typescript-eslint/no-empty-function
const NOOP = () => {}
interface Props {
  containerSize?: Size
  imgSize?: Size
  cellSize?: number
  onMouseDown?: (e: React.MouseEvent, startDownPosition: Point) => void
  onMouseMove?: (e: React.MouseEvent, area: Rect) => void
  onMouseUp?: (e: React.MouseEvent, area: Rect) => void
}

const CELL_OFFSET = 5

export const SelectableGrid = ({
  containerSize,
  imgSize,
  cellSize = 30,
  onMouseDown = NOOP,
  onMouseMove = NOOP,
  onMouseUp = NOOP
}: Props) => {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null)
  const [isDrag, setIsDrag] = React.useState<boolean>(false)
  const [rect, setRect] = React.useState<Rect>({ x: 0, y: 0, w: 0, h: 0 })
  const [startPoint, setStartPoint] = React.useState<Point | null>(null)
  const canvasSize = useCanvasResolution({ containerSize, imgSize })
  const canvasStyles = useCanvasStyles({ containerSize, canvasSize })
  const paddings = useCanvasPaddings({ canvasSize, cellSize })

  const handleMouseDown = (event: React.MouseEvent) => {
    const {
      nativeEvent: { offsetX, offsetY }
    } = event

    const point = { x: offsetX, y: offsetY }

    setIsDrag(true)
    setStartPoint(point)
    setRect({ ...point, w: 0, h: 0 })
    onMouseDown(event, point)
  }

  const handleMouseUp = (event: React.MouseEvent) => {
    setIsDrag(false)
    onMouseUp(event, rect)
  }

  const handleMouseMove = (event: React.MouseEvent) => {
    const {
      nativeEvent: { offsetX, offsetY }
    } = event

    if (!isDrag) {
      return
    }

    if (!startPoint) {
      return
    }

    const area = {
      x: Math.min(offsetX, startPoint.x),
      y: Math.min(offsetY, startPoint.y),
      w: Math.abs(offsetX - startPoint.x),
      h: Math.abs(offsetY - startPoint.y)
    }

    setRect(area)

    onMouseMove(event, area)
  }

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

    ctx.strokeStyle = 'blue'
    ctx.setLineDash([5, 5])
    ctx.lineDashOffset = 0

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
  }, [paddings, canvasSize, cellSize])

  const drawSelectArea = React.useCallback(() => {
    if (!canvasRef.current) {
      return
    }

    const ctx = canvasRef.current.getContext('2d')

    if (!ctx) {
      return
    }

    ctx.strokeStyle = 'red'
    ctx.fillStyle = 'rgba(100,0,0,0.3)'
    ctx.setLineDash([0, 0])

    ctx.strokeRect(rect.x, rect.y, rect.w, rect.h)
    ctx.fillRect(rect.x, rect.y, rect.w, rect.h)
  }, [rect])

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

    ctx.strokeStyle = 'red'
    ctx.fillStyle = 'rgba(100,0,0,0.3)'

    const { x, y, w, h } = rect
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
  }, [startPoint, rect, paddings, cellSize])

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
