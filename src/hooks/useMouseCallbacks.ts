import React from 'react'

import { getPointFromCell } from '../helpers'
import {
  AreaInfo,
  AreaInPercent,
  AreaInPx,
  CanvasSize,
  Paddings,
  Point,
  SelectableArea
} from '../types'

export const useMouseCallbacks = ({
  onMouseDown,
  onMouseMove,
  onMouseUp,
  paddings,
  canvasSize,
  cellSize
}: {
  onMouseDown: (e: React.MouseEvent, downPosition: Point) => void
  onMouseMove: (e: React.MouseEvent, areaInfo: AreaInfo) => void
  onMouseUp: (e: React.MouseEvent, areaInfo: AreaInfo) => void
  paddings: Paddings
  canvasSize: CanvasSize
  cellSize: number
}) => {
  const [isDrag, setIsDrag] = React.useState<boolean>(false)
  const [startPoint, setStartPoint] = React.useState<Point | null>(null)
  const [area, setArea] = React.useState<SelectableArea>({
    x: 0,
    y: 0,
    w: 0,
    h: 0
  })

  // calculate selected area in px
  const areaInPx: AreaInPx = React.useMemo(() => {
    const { x, y, w, h } = area
    const { left: pLeft, top: pTop } = paddings

    const left = getPointFromCell(x, pLeft, cellSize)
    const top = getPointFromCell(y, pTop, cellSize)
    const right = getPointFromCell(x + w, pLeft, cellSize) + cellSize
    const bottom = getPointFromCell(y + h, pTop, cellSize) + cellSize

    return { top, left, right, bottom }
  }, [area, paddings, canvasSize, cellSize])

  // calculate selected area in percent
  const areaInPercent: AreaInPercent = React.useMemo(() => {
    const { width, height } = canvasSize
    const { top, left, right, bottom } = areaInPx

    return {
      top: top / height,
      left: left / width,
      right: right / width,
      bottom: bottom / height
    }
  }, [canvasSize, areaInPx])

  // reset selectable area when canvas changing own sizes
  React.useEffect(() => {
    setIsDrag(false)
    setStartPoint(null)
  }, [canvasSize])

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
    onMouseUp(event, { area, areaInPx, areaInPercent })
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

    onMouseMove(event, { area, areaInPx, areaInPercent })
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
