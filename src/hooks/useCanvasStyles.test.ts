import { renderHook } from '@testing-library/react-hooks'
import { describe, expect, it } from 'vitest'

import { useCanvasStyles } from './useCanvasStyles'

interface Styles {
  top: string
  left: string
  right: string
  bottom: string
}

const createElement = <T extends keyof HTMLElementTagNameMap>(
  tag: T,
  width: number,
  height: number
) => {
  Object.defineProperty(HTMLElement.prototype, 'offsetWidth', { value: width })
  Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
    value: height
  })

  const element = document.createElement<T>(tag)

  element.setAttribute('width', `${width}px`)
  element.setAttribute('height', `${height}px`)

  element.style.width = `${width}px`
  element.style.height = `${height}px`

  return element
}

const CONTAINER_SIZES: [number, number, Styles][] = [
  [0, 0, { top: '0%', left: '0%', right: '0%', bottom: '0%' }],
  [50, 50, { top: '0%', left: '0%', right: '0%', bottom: '0%' }],
  [100, 100, { top: '0%', left: '0%', right: '0%', bottom: '0%' }],
  [
    150,
    150,
    {
      top: '16.666666666666664%',
      left: '16.666666666666664%',
      right: '16.666666666666664%',
      bottom: '16.666666666666664%'
    }
  ],
  [200, 200, { top: '25%', left: '25%', right: '25%', bottom: '25%' }],
  [250, 250, { top: '30%', left: '30%', right: '30%', bottom: '30%' }],
  [
    300,
    300,
    {
      top: '33.33333333333333%',
      left: '33.33333333333333%',
      right: '33.33333333333333%',
      bottom: '33.33333333333333%'
    }
  ]
]

const CANVAS_SIZES: [number, number, Styles][] = [
  [0, 0, { top: '0%', left: '0%', right: '0%', bottom: '0%' }],
  [50, 50, { top: '25%', left: '25%', right: '25%', bottom: '25%' }],
  [100, 100, { top: '0%', left: '0%', right: '0%', bottom: '0%' }],
  [150, 150, { top: '0%', left: '0%', right: '0%', bottom: '0%' }],
  [200, 200, { top: '0%', left: '0%', right: '0%', bottom: '0%' }],
  [250, 250, { top: '0%', left: '0%', right: '0%', bottom: '0%' }],
  [300, 300, { top: '0%', left: '0%', right: '0%', bottom: '0%' }]
]

describe('useCanvasPaddings', () => {
  describe('container', () => {
    it(`container is null`, () => {
      const { result } = renderHook((props) => useCanvasStyles(props), {
        initialProps: {
          canvasSize: {
            width: 100,
            height: 100
          },
          container: null
        }
      })

      expect(result.current).toMatchObject({
        top: '0%',
        left: '0%',
        right: '0%',
        bottom: '0%'
      })
    })

    it.each(CONTAINER_SIZES)(
      'canvas size: w = 100, h = 100, container size: w = %i, h = %i, expected = %o',
      (w, h, expected) => {
        const { result } = renderHook((props) => useCanvasStyles(props), {
          initialProps: {
            canvasSize: {
              width: 100,
              height: 100
            },
            container: createElement('div', w, h)
          }
        })

        expect(result.current).toMatchObject(expected)
      }
    )
  })

  describe('canvas', () => {
    it.each(CANVAS_SIZES)(
      'canvas size: w = %i, h = %i, container size: w = 100, h = 100',
      (w, h, expected) => {
        const { result } = renderHook((props) => useCanvasStyles(props), {
          initialProps: {
            canvasSize: {
              width: w,
              height: h
            },
            container: createElement('div', 100, 100)
          }
        })

        expect(result.current).toMatchObject(expected)
      }
    )
  })

  it(`canvas size and container size: w = 0, h = 0`, () => {
    const { result } = renderHook((props) => useCanvasStyles(props), {
      initialProps: {
        canvasSize: {
          width: 0,
          height: 0
        },
        container: createElement('div', 0, 0)
      }
    })
    expect(result.current).toMatchObject({
      top: '0%',
      left: '0%',
      right: '0%',
      bottom: '0%'
    })
  })
})
