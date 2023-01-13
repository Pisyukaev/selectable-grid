import React, { useEffect, useRef } from 'react'
import SelectGrid from 'selectable-grid'
import type {
  DetailedHTMLProps,
  ImgHTMLAttributes,
  VideoHTMLAttributes
} from 'react'
import type { Options, Area, FillStrokeStyles, Point } from 'selectable-grid'

interface SelectableGridImgProps extends Omit<Options, 'imageContainer'> {
  type: 'img'
  containerProps: DetailedHTMLProps<
    ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >
}

interface SelectableGridVideoProps extends Omit<Options, 'imageContainer'> {
  type: 'video'
  containerProps: DetailedHTMLProps<
    VideoHTMLAttributes<HTMLVideoElement>,
    HTMLVideoElement
  >
}

type SelectableGridProps = SelectableGridImgProps | SelectableGridVideoProps

const useSelectableGrid = (options: Options) => {
  const selectableGridRef = useRef<SelectGrid | null>(null)

  useEffect(
    () => () => {
      selectableGridRef.current = null
    },
    []
  )

  useEffect(() => {
    if (!selectableGridRef.current && options.imageContainer) {
      selectableGridRef.current = new SelectGrid(options)
    }
  }, [options])

  return selectableGridRef.current
}

const SelectableGrid = ({
  containerProps,
  type,
  ...props
}: SelectableGridProps) => {
  const containerRef = useRef<HTMLImageElement | HTMLVideoElement | null>(null)
  const sgRef = useRef<SelectGrid | null>(null)

  const handleLoad = (
    event: React.SyntheticEvent<HTMLVideoElement, Event> &
      React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    if (containerProps.onLoad) {
      containerProps.onLoad(event)
    }

    if (!containerRef.current) {
      return
    }

    sgRef.current = new SelectGrid({
      ...props,
      imageContainer: containerRef.current
    })
  }

  useEffect(() => {
    if (!sgRef.current || !containerRef.current) {
      return
    }

    sgRef.current.setOptions({ ...props, imageContainer: containerRef.current })
  }, [props])

  return React.createElement(type, {
    ...containerProps,
    onLoad: handleLoad,
    ref: containerRef
  })
}

export default SelectableGrid
export { useSelectableGrid, SelectableGrid }
export type { Options, Area, FillStrokeStyles, Point, SelectableGridProps }
