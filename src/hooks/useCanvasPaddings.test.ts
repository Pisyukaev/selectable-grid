import { renderHook } from '@testing-library/react-hooks'
import { describe, expect, it } from 'vitest'

import { useCanvasPaddings } from './useCanvasPaddings'

const initProps = [
  {
    canvasSize: { width: 100, height: 100 },
    cellSize: 10
  },
  {
    canvasSize: { width: 200, height: 200 },
    cellSize: 10
  },
  {
    canvasSize: { width: 300, height: 300 },
    cellSize: 10
  },
  {
    canvasSize: { width: 400, height: 400 },
    cellSize: 10
  }
]

describe('useCanvasPaddings', () => {
  const { result, rerender } = renderHook((props) => useCanvasPaddings(props), {
    initialProps: {
      canvasSize: { width: 400, height: 400 },
      cellSize: 10
    }
  })

  it(`cell size:  and canvasSize: {width: , height: `, () => {
    expect(result.current.top).toBe(0)
    expect(result.current.left).toBe(0)
    expect(result.current.right).toBe(0)
    expect(result.current.bottom).toBe(0)
  })

  it('asd', () => {
    rerender({
      canvasSize: { width: 300, height: 300 },
      cellSize: 10
    })
    expect(result.current.top).toBe(0)
    expect(result.current.left).toBe(0)
    expect(result.current.right).toBe(0)
    expect(result.current.bottom).toBe(0)
  })

  // for (let i = 0; i < initProps.length; i++) {
  //   const props = initProps[i]

  //   it(`cell size: ${props.cellSize} and canvasSize: {width: ${props.canvasSize.width}, height: ${props.canvasSize.height}}`, () => {
  //     const { result } = renderHook((props) => useCanvasPaddings(props), {
  //       initialProps: props
  //     })

  //     expect(result.current.top).toBe(0)
  //     expect(result.current.left).toBe(0)
  //     expect(result.current.right).toBe(0)
  //     expect(result.current.bottom).toBe(0)
  //   })
  // }
})
