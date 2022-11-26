import { useEffect, useRef } from 'react'
import SelectGrid from 'selectable-grid'
import type { Options, Area, FillStrokeStyles, Point } from 'selectable-grid'

const useSelectableGrid = (options: Options) => {
  const selectableGridRef = useRef<SelectGrid | null>(null)

  useEffect(() => () => (selectableGridRef.current = null), [])

  useEffect(() => {
    if (!selectableGridRef.current && options.imageContainer) {
      selectableGridRef.current = new SelectGrid(options)
    }
  }, [options])

  return selectableGridRef.current
}

const SelectableGrid = (props: Options) => {
  const selectableGrid = useSelectableGrid(props)

  useEffect(() => {
    if (!selectableGrid) {
      return
    }

    selectableGrid.setOptions(props)
  }, [props, selectableGrid])

  return null
}

export default SelectableGrid
export { useSelectableGrid, SelectableGrid }
export type { Options, Area, FillStrokeStyles, Point }
