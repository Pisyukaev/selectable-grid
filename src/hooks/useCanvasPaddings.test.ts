import { renderHook } from '@testing-library/react-hooks'
import { describe, expect, it } from 'vitest'
import { CanvasSize, Paddings } from '../types'

import { useCanvasPaddings } from './useCanvasPaddings'

const data: [{ canvasSize: CanvasSize; cellSize: number }, Paddings][] = [
  [
    {
      canvasSize: { width: 100, height: 100 },
      cellSize: 10
    },
    { top: 0, left: 0, right: 0, bottom: 0 }
  ],
  [
    {
      canvasSize: { width: 200, height: 200 },
      cellSize: 10
    },
    { top: 0, left: 0, right: 0, bottom: 0 }
  ],
  [
    {
      canvasSize: { width: 300, height: 300 },
      cellSize: 10
    },
    { top: 0, left: 0, right: 0, bottom: 0 }
  ],
  [
    {
      canvasSize: { width: 400, height: 400 },
      cellSize: 10
    },
    { top: 0, left: 0, right: 0, bottom: 0 }
  ],
  [
    {
      canvasSize: { width: 400, height: 400 },
      cellSize: 15
    },
    { top: 5, left: 5, right: 5, bottom: 5 }
  ],
  [
    {
      canvasSize: { width: 400, height: 400 },
      cellSize: 12
    },
    { top: 2, left: 2, right: 2, bottom: 2 }
  ],
  [
    {
      canvasSize: { width: 357, height: 400 },
      cellSize: 12
    },
    { top: 2, left: 4.5, right: 4.5, bottom: 2 }
  ],
  [
    {
      canvasSize: { width: 357, height: 459 },
      cellSize: 12
    },
    { top: 1.5, left: 4.5, right: 4.5, bottom: 1.5 }
  ],
  [
    {
      canvasSize: { width: 357, height: 459 },
      cellSize: 10
    },
    { top: 4.5, left: 3.5, right: 3.5, bottom: 4.5 }
  ],

  [
    {
      canvasSize: { width: 351, height: 455 },
      cellSize: 10
    },
    { top: 2.5, left: 0.5, right: 0.5, bottom: 2.5 }
  ]
]

describe('useCanvasPaddings', () => {
  const { result, rerender } = renderHook((props) => useCanvasPaddings(props), {
    initialProps: {
      canvasSize: { width: 0, height: 0 },
      cellSize: 10
    }
  })

  it('init props = canvasSize: width = 0, height = 0, cellSize = 10', () => {
    expect(result.current).toMatchObject({
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    })
  })

  it.each(data)('init props = %o, expect = %o', (p, expected) => {
    rerender(p)

    expect(result.current).toMatchObject(expected)
  })
})
