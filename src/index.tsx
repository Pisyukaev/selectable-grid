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
interface Props {
  containerSize?: Size
  imgSize?: Size
}

export const SelectableGrid = ({ containerSize, imgSize }: Props) => {
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

  if (!containerSize || !imgSize) {
    return null
  }

  return (
    <canvas
      className={styles.canvas}
      style={{ ...canvasStyles }}
      width={canvasSize.width}
      height={canvasSize.height}
    />
  )
}
