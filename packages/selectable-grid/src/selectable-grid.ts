import { throttle } from './utils'
import type { Area, FillStrokeStyles, Options, Point } from './types'

const THROTTLE_MS = 10

const GRID_STYLES: FillStrokeStyles = {
  strokeStyle: '#000000'
}

const CELLS_STYLES: FillStrokeStyles = {
  fillStyle: '#47fffc80'
}

const AREA_STYLES: FillStrokeStyles = {
  fillStyle: '#ff634780'
}

const OPTIONS: Options = {
  cellCount: 30,
  container: null,
  isArea: true,
  isCells: true,
  isGrid: true,
  keepArea: false
}

export class SelectableGrid {
  #canvas: HTMLCanvasElement
  #options: Options
  #ctx: CanvasRenderingContext2D
  #cellWidth: number
  #cellHeight: number
  #isDown: boolean
  #beginPoint: Point | null
  #area: Area | null
  #selectArea: Area | null
  #observer: ResizeObserver | null
  #requestAnimationId: number | null
  #throttledMouseMove: (area: Area, selectArea: Area, e: MouseEvent) => void

  constructor(options: Options) {
    this.#options = { ...OPTIONS, ...options }
    this.#cellWidth = 0
    this.#cellHeight = 0
    this.#isDown = false
    this.#beginPoint = null
    this.#area = null
    this.#selectArea = null
    this.#requestAnimationId = null

    this.#canvas = document.createElement('canvas')
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.#ctx = this.#canvas.getContext('2d')!
    this.#setCanvasStyles()

    this.#updateThrottledMouseMove()

    this.#observer = new ResizeObserver(() => this.#init())
    this.#init()
  }

  #updateStyles(styles: FillStrokeStyles) {
    if (!styles) {
      return
    }

    for (const style in styles) {
      this.#ctx[style] = styles[style]
    }
  }

  #updateThrottledMouseMove() {
    const { mouseMove } = this.#options

    if (mouseMove) {
      this.#throttledMouseMove = throttle(mouseMove, THROTTLE_MS)
    }
  }

  // handlers
  #handleDown = (event: MouseEvent) => {
    const { offsetX, offsetY } = event
    const { mouseDown } = this.#options
    this.#isDown = true

    this.#beginPoint = { x: offsetX, y: offsetY }
    this.#selectArea = { ...this.#beginPoint, w: 0, h: 0 }

    if (mouseDown) {
      mouseDown(this.#beginPoint, event)
    }
  }

  #handleMove = (event: MouseEvent) => {
    const { offsetX, offsetY } = event
    const { mouseMove } = this.#options
    if (!this.#isDown || !this.#beginPoint) {
      return
    }

    const { x, y } = this.#beginPoint

    this.#selectArea = {
      x: Math.min(offsetX, x),
      y: Math.min(offsetY, y),
      w: Math.abs(offsetX - x),
      h: Math.abs(offsetY - y)
    }

    if (mouseMove) {
      this.#throttledMouseMove(this.#area, this.#selectArea, event)
    }
  }

  #handleUp = (event: MouseEvent) => {
    const { mouseUp, keepArea } = this.#options

    this.#isDown = false

    if (!keepArea) {
      this.#beginPoint = null
    }

    if (mouseUp) {
      mouseUp(this.#area, this.#selectArea, event)
    }
  }

  #setCanvasStyles() {
    const { canvasClassName } = this.#options

    if (canvasClassName) {
      this.#canvas.classList.add(canvasClassName)
    }

    this.#canvas.style.position = 'absolute'
    this.#canvas.style.top = '0'
    this.#canvas.style.left = '0'
  }

  #subscribe() {
    this.#observer.observe(this.#options.container)
    this.#canvas.addEventListener('mousedown', this.#handleDown)
    this.#canvas.addEventListener('mousemove', this.#handleMove)
    this.#canvas.addEventListener('mouseup', this.#handleUp)
  }

  #unsubscribe() {
    this.#observer.unobserve(this.#options.container)
    this.#canvas.removeEventListener('mousedown', this.#handleDown)
    this.#canvas.removeEventListener('mousemove', this.#handleMove)
    this.#canvas.removeEventListener('mouseup', this.#handleUp)
  }

  #calculateCellSize() {
    const {
      container: { clientHeight, clientWidth },
      cellCount
    } = this.#options

    this.#cellWidth = clientWidth / cellCount
    this.#cellHeight = clientHeight / cellCount
  }

  #drawGrid() {
    const { isGrid } = this.#options
    const { clientWidth, clientHeight } = this.#canvas

    if (!isGrid) {
      return
    }

    if (!clientWidth || !clientHeight) {
      return
    }

    this.#updateStyles({ ...GRID_STYLES, ...this.#options.gridStyles })

    this.#ctx.lineWidth = 2
    this.#ctx.beginPath()

    this.#ctx.strokeRect(1, 1, clientWidth - 2, clientHeight - 2)

    for (let x = this.#cellWidth; x <= clientWidth; x += this.#cellWidth) {
      this.#ctx.moveTo(x, 0)
      this.#ctx.lineTo(x, clientHeight)
    }

    for (let y = this.#cellHeight; y < clientHeight; y += this.#cellHeight) {
      this.#ctx.moveTo(0, y)
      this.#ctx.lineTo(clientWidth, y)
    }

    this.#ctx.stroke()
  }

  #drawArea() {
    const { isArea } = this.#options

    if (!isArea) {
      return
    }

    if (!this.#selectArea || !this.#beginPoint) {
      return
    }

    this.#updateStyles({ ...AREA_STYLES, ...this.#options.areaStyles })

    const { x, y, w, h } = this.#selectArea

    this.#ctx.strokeRect(x, y, w, h)
    this.#ctx.fillRect(x, y, w, h)
  }

  #drawCells() {
    const { isCells } = this.#options

    if (!isCells) {
      return
    }

    if (!this.#selectArea) {
      return
    }

    this.#updateStyles({ ...CELLS_STYLES, ...this.#options.cellsStyles })

    const { x, y, w, h } = this.#selectArea

    const startX = Math.floor(x / this.#cellWidth)
    const endX = Math.ceil((x + w) / this.#cellWidth)
    const startY = Math.floor(y / this.#cellHeight)
    const endY = Math.ceil((y + h) / this.#cellHeight)

    const countX = endX - startX
    const countY = endY - startY

    this.#area = {
      x: startX * this.#cellWidth,
      y: startY * this.#cellHeight,
      w: (countX || 1) * this.#cellWidth,
      h: (countY || 1) * this.#cellHeight
    }

    this.#ctx.clearRect(this.#area.x, this.#area.y, this.#area.w, this.#area.h)
    this.#ctx.fillRect(this.#area.x, this.#area.y, this.#area.w, this.#area.h)
  }

  #renderCanvas() {
    const { container } = this.#options
    const { clientHeight, clientWidth } = container

    this.#canvas.width = clientWidth
    this.#canvas.height = clientHeight

    container.parentElement?.append(this.#canvas)

    this.#subscribe()
  }

  #init() {
    this.#clear()
    this.#calculateCellSize()
    this.#renderCanvas()

    if (this.#requestAnimationId) {
      cancelAnimationFrame(this.#requestAnimationId)
    }

    this.#draw()
  }

  #draw() {
    const { clientWidth, clientHeight } = this.#canvas
    this.#ctx.clearRect(0, 0, clientWidth, clientHeight)

    this.#drawCells()
    this.#drawGrid()
    this.#drawArea()

    this.#requestAnimationId = requestAnimationFrame(() => this.#draw())
  }

  #clear() {
    this.#area = null
    this.#selectArea = null
    this.#beginPoint = null
    this.#isDown = false
  }

  setOptions(newOptions: Partial<Options>) {
    this.#options = { ...OPTIONS, ...this.#options, ...newOptions }

    this.#clear()
    this.#unsubscribe()

    this.#updateThrottledMouseMove()
    this.#setCanvasStyles()

    this.#init()
  }
}
