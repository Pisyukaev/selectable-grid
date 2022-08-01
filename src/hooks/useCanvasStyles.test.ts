import { renderHook } from '@testing-library/react-hooks'
import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { useCanvasStyles } from './useCanvasStyles'

const createElement = <T extends keyof HTMLElementTagNameMap>(
  tag: T,
  width: number,
  height: number
) => {
  const element = document.createElement<T>(tag)

  element.setAttribute('width', `${width}px`)
  element.setAttribute('height', `${height}px`)

  // element.style.width = `${width}px`
  // element.style.height = `${height}px`
  document.body.appendChild(element)

  return element
}

describe('useCanvasPaddings', () => {
  it(`canvas pandings 0 0`, () => {
    const { result } = renderHook((props) => useCanvasStyles(props), {
      initialProps: {
        canvasSize: {
          width: 100,
          height: 100
        },
        container: createElement('div', 0, 0)
      }
    })
    expect(result.current.top).toBe('0%')
    expect(result.current.left).toBe('0%')
    expect(result.current.right).toBe('0%')
    expect(result.current.bottom).toBe('0%')
  })

  it(`canvas pandings 100 100`, () => {
    const { result } = renderHook((props) => useCanvasStyles(props), {
      initialProps: {
        canvasSize: {
          width: 100,
          height: 100
        },
        container: createElement('div', 100, 100)
      }
    })
    expect(result.current.top).toBe('1%')
    expect(result.current.left).toBe('1%')
    expect(result.current.right).toBe('1%')
    expect(result.current.bottom).toBe('1%')
  })
})
