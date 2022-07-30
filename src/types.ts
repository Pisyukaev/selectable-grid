export interface Size {
  width: number
  height: number
  aspect: number
}

export interface CanvasSize {
  width: number
  height: number
}

interface Area {
  top: number
  left: number
  right: number
  bottom: number
}

export type AreaInPx = Area
export type AreaInPercent = Area

export interface Paddings {
  top: number
  left: number
  right: number
  bottom: number
}

export interface SelectableArea {
  x: number
  y: number
  w: number
  h: number
}

export interface AreaInfo {
  area: SelectableArea
  areaInPx: AreaInPx
  areaInPercent: AreaInPercent
}

export interface Point {
  x: number
  y: number
}

export interface CtxStyles {
  strokeStyle: CanvasFillStrokeStyles['strokeStyle']
  lineDashOffset: CanvasPathDrawingStyles['lineDashOffset']
  fillStyle: CanvasFillStrokeStyles['fillStyle']
  lineDash: number[]
}

export type CtxStylesOptional = Partial<CtxStyles>

export type GridStyles = Omit<CtxStylesOptional, 'fillStyle'>
export type AreaStyles = Omit<CtxStylesOptional, 'lineDashOffset'>
export type CellsStyles = Omit<CtxStylesOptional, 'lineDashOffset' | 'lineDash'>
