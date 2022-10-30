export interface Options {
  imageContainer: HTMLImageElement | HTMLVideoElement
  cellCount: number
  mouseMove?: (area: Area, e: MouseEvent) => void
  mouseDown?: (point: Point, e: MouseEvent) => void
  mouseUp?: (area: Area, e: MouseEvent) => void
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
