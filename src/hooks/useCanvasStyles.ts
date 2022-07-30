import React from 'react'

import { CanvasSize } from '../types'

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

  React.useEffect(() => {
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
