import React from 'react'

import { CanvasSize, Size } from '../types'

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

  return canvasSize
}
