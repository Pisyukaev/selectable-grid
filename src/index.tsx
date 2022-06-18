import * as React from 'react'
import styles from './styles.module.css'

interface Size {
  width: number
  height: number
  aspect: number
}

interface CanvasSize {
  width: number
  height: number
}

interface Paddings {
  top: number
  left: number
  right: number
  bottom: number
}

interface Rect {
  x: number
  y: number
  w: number
  h: number
}
interface Props {
  containerSize?: Size
  imgSize?: Size
  cellSize?: number
}

interface Point {
  x: number
  y: number
}

export const SelectableGrid = ({
  containerSize,
  imgSize,
  cellSize = 30
}: Props) => {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null)
  const [isDrag, setIsDrag] = React.useState<boolean>(false)
  const [rect, setRect] = React.useState<Rect>({ x: 0, y: 0, w: 0, h: 0 })
  const [startPoint, setStartPoint] = React.useState<Point>({ x: 0, y: 0 })
  const [canvasSize, setCanvasSize] = React.useState<CanvasSize>({
    width: 0,
    height: 0
  })
  const [canvasStyles, setCanvasStyles] = React.useState({
    top: '0',
    left: '0',
    right: '0',
    bottom: '0'
  })

  const [paddings, setPaddings] = React.useState<Paddings>({
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  })

  const handleMouseDown = ({
    nativeEvent: { offsetX, offsetY }
  }: React.MouseEvent) => {
    setIsDrag(true)
    setStartPoint({ x: offsetX, y: offsetY })
    setRect({ x: offsetX, y: offsetY, w: 0, h: 0 })
  }

  const handleMouseUp = () => {
    setIsDrag(false)
    setRect({ x: 0, y: 0, w: 0, h: 0 })
  }

  const handleMouseMove = ({
    nativeEvent: { offsetX, offsetY }
  }: React.MouseEvent) => {
    if (!isDrag) {
      return
    }

    setRect({
      x: Math.min(offsetX, startPoint.x),
      y: Math.min(offsetY, startPoint.y),
      w: Math.abs(offsetX - startPoint.x),
      h: Math.abs(offsetY - startPoint.y)
    })
  }

  // set canvas size
  React.useEffect(() => {
    if (!containerSize || !imgSize) {
      return
    }

    const { width, height } = containerSize
    const { aspect } = imgSize

    const newImgWidth = height * aspect
    const newImgHeight = width / aspect

    const isWidest = newImgHeight <= height

    const size = {
      width: isWidest ? width : newImgWidth,
      height: isWidest ? newImgHeight : height
    }

    setCanvasSize(size)
  }, [containerSize, imgSize])

  // set canvas styles
  React.useEffect(() => {
    if (!containerSize || !canvasSize.width || !canvasSize.height) {
      return
    }

    const { width: containerWidth, height: containerHeight } = containerSize
    const { width: canvasWidth, height: canvasHeight } = canvasSize

    const isOffsetX = canvasWidth <= containerWidth
    const isOffsetY = canvasHeight <= containerHeight

    const offsetX = isOffsetX ? (containerWidth - canvasWidth) / 2 : 0
    const offsetY = isOffsetY ? (containerHeight - canvasHeight) / 2 : 0

    const styles = {
      top: `${(offsetY / containerHeight) * 100}%`,
      left: `${(offsetX / containerWidth) * 100}%`,
      right: `${(offsetX / containerWidth) * 100}%`,
      bottom: `${(offsetY / containerHeight) * 100}%`
    }

    setCanvasStyles(styles)
  }, [containerSize, canvasSize])

  // set paddings for grid
  React.useEffect(() => {
    const { width, height } = canvasSize

    if (!width || !height) {
      return
    }

    const cellCountX = Math.floor(width / cellSize)
    const cellCountY = Math.floor(height / cellSize)

    const paddingX = width - cellCountX * cellSize
    const paddingY = height - cellCountY * cellSize

    const paddingTop = paddingY / 2 - 0.5
    const paddingLeft = paddingX / 2 - 0.5
    const paddingRight = paddingLeft
    const paddingBottom = paddingTop

    setPaddings({
      top: paddingTop,
      left: paddingLeft,
      right: paddingRight,
      bottom: paddingBottom
    })
  }, [canvasSize, cellSize])

  // draw grid
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

    ctx.strokeStyle = 'red'
    ctx.fillStyle = 'rgba(100,0,0,0.3)'
    ctx.setLineDash([0, 0])

    ctx.strokeRect(rect.x, rect.y, rect.w, rect.h)
    ctx.fillRect(rect.x, rect.y, rect.w, rect.h)
  }, [canvasSize, rect])

  React.useEffect(() => {
    requestAnimationFrame(drawGrid)
  }, [drawGrid])

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
