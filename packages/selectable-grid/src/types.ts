export interface FillStrokeStyles {
  fillStyle?: CanvasFillStrokeStyles['fillStyle']
  strokeStyle?: CanvasFillStrokeStyles['strokeStyle']
}
export interface Options {
  imageContainer: HTMLImageElement | HTMLVideoElement
  cellCount: number
  mouseMove?: (area: Area, e: MouseEvent) => void
  mouseDown?: (point: Point, e: MouseEvent) => void
  mouseUp?: (area: Area, e: MouseEvent) => void
  cellsStyles?: Omit<FillStrokeStyles, 'strokeStyle'>
  gridStyles?: Omit<FillStrokeStyles, 'fillStyle'>
  areaStyles?: FillStrokeStyles
  isArea?: boolean
  isCells?: boolean
  isGrid?: boolean
}

export interface Point {
  x: number
  y: number
}
export interface Area {
  x: number
  y: number
  w: number
  h: number
}
