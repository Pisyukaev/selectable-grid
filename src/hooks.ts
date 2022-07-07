import React, { useCallback, useEffect, useRef, useState } from 'react'

import { Size, CanvasSize, Paddings, Point, SelectableArea } from './types'

// set canvas size
export const useCanvasResolution = ({
  containerSize,
  imgSize
}: {
  containerSize?: Size
  imgSize?: Size
}) => {
  const [canvasSize, setCanvasSize] = React.useState<CanvasSize>({
    width: 0,
    height: 0
  })

  useEffect(() => {
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

  return canvasSize
}

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

  useEffect(() => {
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

  return paddings
}

// set canvas styles
export const useCanvasStyles = ({
  container,
  canvasSize
}: {
  container: HTMLDivElement | null
  canvasSize: CanvasSize
}) => {
  const [canvasStyles, setCanvasStyles] = React.useState({
    top: '0',
    left: '0',
    right: '0',
    bottom: '0'
  })

  useEffect(() => {
    if (!container || !canvasSize.width || !canvasSize.height) {
      return
    }

    const { offsetWidth: containerWidth, offsetHeight: containerHeight } =
      container
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
  }, [container, canvasSize])

  return canvasStyles
}

export const useMouseCallbacks = ({
  onMouseDown,
  onMouseMove,
  onMouseUp
}: {
  onMouseDown: (e: React.MouseEvent, downPosition: Point) => void
  onMouseMove: (e: React.MouseEvent, area: SelectableArea) => void
  onMouseUp: (e: React.MouseEvent, area: SelectableArea) => void
}) => {
  const [isDrag, setIsDrag] = React.useState<boolean>(false)
  const [startPoint, setStartPoint] = React.useState<Point | null>(null)
  const [area, setArea] = React.useState<SelectableArea>({
    x: 0,
    y: 0,
    w: 0,
    h: 0
  })

  const handleMouseDown = (event: React.MouseEvent) => {
    const {
      nativeEvent: { offsetX, offsetY }
    } = event

    const point = { x: offsetX, y: offsetY }

    setIsDrag(true)
    setStartPoint(point)
    setArea({ ...point, w: 0, h: 0 })
    onMouseDown(event, point)
  }

  const handleMouseUp = (event: React.MouseEvent) => {
    setIsDrag(false)
    onMouseUp(event, area)
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

    setArea(area)

    onMouseMove(event, area)
  }

  return {
    isDrag,
    area,
    startPoint,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp
  }
}

export const useResponsiveSize = ({
  container,
  imgSize
}: {
  container: HTMLDivElement | null
  imgSize?: Size
}) => {
  const resizeObserverRef = useRef<ResizeObserver>()
  const [size, setSize] = useState<{
    width: number
    height: number
    aspect: number
  }>()

  const handleResize = useCallback(() => {
    if (!container) {
      return
    }

    const { clientWidth, clientHeight } = container

    setSize({
      width: clientWidth,
      height: clientHeight,
      aspect: clientWidth / clientHeight
    })
  }, [container])

  useEffect(() => {
    if (!resizeObserverRef.current && container) {
      resizeObserverRef.current = new ResizeObserver(handleResize)
      resizeObserverRef.current.observe(container)
    }
  }, [container, handleResize])

  const canvasSize = useCanvasResolution({ containerSize: size, imgSize })

  return canvasSize
}
