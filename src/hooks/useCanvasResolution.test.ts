import { renderHook } from '@testing-library/react-hooks'
import { describe, expect, it } from 'vitest'
import { Size, CanvasSize } from '../types'

import { useCanvasResolution } from './useCanvasResolution'

const DATA: [Size, Size, CanvasSize][] = [
  [
    {
      width: 100,
      height: 100,
      aspect: 1
    },
    {
      width: 50,
      height: 50,
      aspect: 1
    },
    { width: 100, height: 100 }
  ],
  [
    {
      width: 100,
      height: 100,
      aspect: 1
    },
    {
      width: 100,
      height: 100,
      aspect: 1
    },
    { width: 100, height: 100 }
  ],
  [
    {
      width: 100,
      height: 100,
      aspect: 1
    },
    {
      width: 200,
      height: 200,
      aspect: 1
    },
    { width: 100, height: 100 }
  ],
  [
    {
      width: 50,
      height: 50,
      aspect: 1
    },
    {
      width: 50,
      height: 50,
      aspect: 1
    },
    { width: 50, height: 50 }
  ],
  [
    {
      width: 500,
      height: 500,
      aspect: 1
    },
    {
      width: 1920,
      height: 1080,
      aspect: 1.7777777777777777
    },
    { width: 500, height: 281.25 }
  ],
  [
    {
      width: 1920,
      height: 1080,
      aspect: 1.7777777777777777
    },
    {
      width: 1920,
      height: 1080,
      aspect: 1.7777777777777777
    },
    { width: 1920, height: 1080 }
  ]
]

describe('useCanvasResolution', () => {
  it('containerSize and imgSize is undefined', () => {
    const { result } = renderHook((props) => useCanvasResolution(props), {
      initialProps: {
        containerSize: undefined,
        imgSize: undefined
      }
    })

    expect(result.current).toMatchObject({ width: 0, height: 0 })
  })

  it('containerSize is undefined', () => {
    const { result } = renderHook((props) => useCanvasResolution(props), {
      initialProps: {
        containerSize: undefined,
        imgSize: { width: 100, height: 100, aspect: 1 }
      }
    })

    expect(result.current).toMatchObject({ width: 0, height: 0 })
  })

  it('imgSize is undefined', () => {
    const { result } = renderHook((props) => useCanvasResolution(props), {
      initialProps: {
        containerSize: { width: 100, height: 100, aspect: 1 },
        imgSize: undefined
      }
    })

    expect(result.current).toMatchObject({ width: 0, height: 0 })
  })

  it('containerSize and imgSize is { width: 0, height: 0, aspect: 0 }', () => {
    const { result } = renderHook((props) => useCanvasResolution(props), {
      initialProps: {
        containerSize: { width: 0, height: 0, aspect: 0 },
        imgSize: { width: 0, height: 0, aspect: 0 }
      }
    })

    expect(result.current).toMatchObject({ width: 0, height: 0 })
  })

  it("containerSize is 0 and imgSize's aspect is random", () => {
    const { result } = renderHook((props) => useCanvasResolution(props), {
      initialProps: {
        containerSize: {
          width: 0,
          height: 0,
          aspect: 0
        },
        imgSize: {
          width: 0,
          height: 0,
          aspect: Math.random() * 2
        }
      }
    })

    expect(result.current).toMatchObject({ width: 0, height: 0 })
  })

  it.each(DATA)(
    'containerSize = %o, imgSize = %0, expected = %o',
    (containerSize, imgSize, expected) => {
      const { result } = renderHook((props) => useCanvasResolution(props), {
        initialProps: {
          containerSize,
          imgSize
        }
      })

      expect(result.current).toMatchObject(expected)
    }
  )
})
