import React, { useEffect } from 'react'

import { Size, CanvasSize, Paddings } from './types'

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
  containerSize,
  canvasSize
}: {
  containerSize?: Size
  canvasSize: CanvasSize
}) => {
  const [canvasStyles, setCanvasStyles] = React.useState({
    top: '0',
    left: '0',
    right: '0',
    bottom: '0'
  })

  useEffect(() => {
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

  return canvasStyles
}
