import { Area, Options } from './types'

export class SelectableGrid {
  #canvas: HTMLCanvasElement
  #options: Options
  #ctx: CanvasRenderingContext2D
  #cellWidth: number
  #cellHeight: number
  #isDown: boolean
  #handleDown: ({ offsetX, offsetY }: MouseEvent) => void
  #handleMove: ({ offsetX, offsetY }: MouseEvent) => void
  #handleUp: ({ offsetX, offsetY }: MouseEvent) => void
  #beginPoint: { x: number; y: number } | null
  #area: Area | null
  #observer: ResizeObserver | null
  #requestAnimationId: number | null

  constructor(options: Options) {
    this.#options = options
    this.#cellWidth = 0
    this.#cellHeight = 0
    this.#isDown = false
    this.#beginPoint = null
    this.#area = null
    this.#requestAnimationId = null

    // handlers
    this.#handleDown = ({ offsetX, offsetY }: MouseEvent) => {
      this.#isDown = true

      this.#beginPoint = { x: offsetX, y: offsetY }
      this.#area = { ...this.#beginPoint, w: 0, h: 0 }
    }
    this.#handleMove = ({ offsetX, offsetY }: MouseEvent) => {
      if (!this.#isDown || !this.#beginPoint) {
        return
      }

      const { x, y } = this.#beginPoint

      this.#area = {
        x: Math.min(offsetX, x),
        y: Math.min(offsetY, y),
        w: Math.abs(offsetX - x),
        h: Math.abs(offsetY - y)
      }
    }
    this.#handleUp = () => {
      this.#isDown = false
      this.#beginPoint = null
    }

    this.#canvas = document.createElement('canvas')
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.#ctx = this.#canvas.getContext('2d')!
    this.#setCanvasStyles()

    this.#observer = new ResizeObserver(() => this.#init())
    this.#observer.observe(this.#options.imageContainer)
  }

  #setCanvasStyles() {
    this.#canvas.style.position = 'absolute'
    this.#canvas.style.top = '0'
    this.#canvas.style.left = '0'
  }

  #subscribe() {
    // if (this.#observer !== null) {
    //   this.#observer.observe(this.#options.imageContainer)
    // }

    this.#canvas.addEventListener('mousedown', this.#handleDown)
    this.#canvas.addEventListener('mousemove', this.#handleMove)
    this.#canvas.addEventListener('mouseup', this.#handleUp)
  }

  #unsubscribe() {
    if (this.#observer !== null) {
      this.#observer.unobserve(this.#options.imageContainer)
    }
    this.#canvas.removeEventListener('mousedown', this.#handleDown)
    this.#canvas.removeEventListener('mousemove', this.#handleMove)
    this.#canvas.removeEventListener('mouseup', this.#handleUp)
  }

  #calculateCellSize() {
    const {
      imageContainer: { clientHeight, clientWidth },
      cellCount
    } = this.#options

    this.#cellWidth = clientWidth / cellCount
    this.#cellHeight = clientHeight / cellCount
  }

  #drawGrid() {
    const { clientWidth, clientHeight } = this.#canvas

    if (!clientWidth || !clientHeight) {
      return
    }

    this.#ctx.beginPath()

    for (let x = 0; x <= clientWidth; x += this.#cellWidth) {
      this.#ctx.moveTo(x, 0)
      this.#ctx.lineTo(x, clientHeight)
    }

    for (let y = 0; y <= clientHeight; y += this.#cellHeight) {
      this.#ctx.moveTo(0, y)
      this.#ctx.lineTo(clientWidth, y)
    }

    this.#ctx.stroke()
  }

  #drawArea() {
    if (!this.#area || !this.#beginPoint) {
      return
    }

    this.#ctx.fillStyle = '#ff634780'

    const { x, y, w, h } = this.#area

    this.#ctx.strokeRect(x, y, w, h)
    this.#ctx.fillRect(x, y, w, h)
  }

  #drawCells() {
    if (!this.#area) {
      return
    }

    this.#ctx.fillStyle = '#47fffc80'

    const { x, y, w, h } = this.#area

    const startX = Math.floor(x / this.#cellWidth)
    const endX = Math.ceil((x + w) / this.#cellWidth)
    const startY = Math.floor(y / this.#cellHeight)
    const endY = Math.ceil((y + h) / this.#cellHeight)

    const countX = endX - startX
    const countY = endY - startY

    for (let cellX = 0; cellX < countX; cellX += 1) {
      for (let cellY = 0; cellY < countY; cellY += 1) {
        const xCell =
          Math.floor((x + cellX * this.#cellWidth) / this.#cellWidth) *
          this.#cellWidth
        const yCell =
          Math.floor((y + cellY * this.#cellHeight) / this.#cellHeight) *
          this.#cellHeight

        this.#ctx.clearRect(xCell, yCell, this.#cellWidth, this.#cellHeight)
        this.#ctx.fillRect(xCell, yCell, this.#cellWidth, this.#cellHeight)
      }
    }
  }

  #renderCanvas() {
    const { imageContainer } = this.#options
    const { clientHeight, clientWidth } = imageContainer

    this.#canvas.width = clientWidth
    this.#canvas.height = clientHeight

    imageContainer.parentElement?.append(this.#canvas)

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

    this.#requestAnimationId = requestAnimationFrame(this.#draw.bind(this))
  }

  #clear() {
    this.#area = null
    this.#beginPoint = null
    this.#isDown = false
  }

  setOptions(newOptions: Partial<Options>) {
    this.#options = { ...this.#options, ...newOptions }

    this.#clear()
    this.#unsubscribe()

    this.#init()
  }
}
