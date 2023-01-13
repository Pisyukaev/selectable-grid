export interface FillStrokeStyles {
  fillStyle?: CanvasRenderingContext2D['fillStyle']
  strokeStyle?: CanvasRenderingContext2D['strokeStyle']
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

export interface Options {
  imageContainer: HTMLImageElement | HTMLVideoElement
  cellCount: number
  mouseMove?: (area: Area, selectArea: Area, e: MouseEvent) => void
  mouseDown?: (point: Point, e: MouseEvent) => void
  mouseUp?: (area: Area, selectArea: Area, e: MouseEvent) => void
  cellsStyles?: Omit<FillStrokeStyles, 'strokeStyle'>
  gridStyles?: Omit<FillStrokeStyles, 'fillStyle'>
  areaStyles?: FillStrokeStyles
  isArea?: boolean
  keepArea?: boolean
  isCells?: boolean
  isGrid?: boolean
  canvasClassName?: string
}
