import React from 'react'

import { useCanvasResolution } from './useCanvasResolution'
import { Size } from '../types'

export const useResponsiveSize = ({
  container,
  imgSize
}: {
  container: HTMLDivElement | null
  imgSize?: Size
}) => {
  const resizeObserverRef = React.useRef<ResizeObserver>()
  const [size, setSize] = React.useState<{
    width: number
    height: number
    aspect: number
  }>()

  const handleResize = React.useCallback(() => {
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

  React.useEffect(() => {
    if (!resizeObserverRef.current && container) {
      resizeObserverRef.current = new ResizeObserver(handleResize)
      resizeObserverRef.current.observe(container)
    }
  }, [container, handleResize])

  const canvasSize = useCanvasResolution({ containerSize: size, imgSize })

  return canvasSize
}
