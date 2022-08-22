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
  const canvasSize: CanvasSize = React.useMemo(() => {
    if (!containerSize || !imgSize) {
      return {
        width: 0,
        height: 0
      }
    }

    const { width, height } = containerSize
    const { aspect } = imgSize

    const newImgWidth = height * aspect
    const newImgHeight = width / aspect

    const isWidest = newImgHeight <= height

    return {
      width: isWidest ? width : newImgWidth,
      height: isWidest ? newImgHeight : height
    }
  }, [containerSize, imgSize])

  return canvasSize
}
