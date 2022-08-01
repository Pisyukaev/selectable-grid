import { describe, expect, it } from 'vitest'

import { getPointFromCell } from './helpers'

describe('helpers', () => {
  describe('getPointFromCell', () => {
    it('all args are 0', () => {
      const point = getPointFromCell(0, 0, 0)

      expect(point).toBe(0)
    })

    describe('one of  arguments are 0', () => {
      for (let i = 0; i <= 30; i += 5) {
        it(`side = 0`, () => {
          const point = getPointFromCell(0, i, i)

          expect(point).toBe(0)
        })

        it(`paddingSide = 0`, () => {
          const point = getPointFromCell(i, 0, i)

          expect(point).toBe(i)
        })

        it(`cellSize = 0`, () => {
          const point = getPointFromCell(0, i, i)

          expect(point).toBe(0)
        })
      }
    })

    describe('two of the arguments are 0', () => {
      for (let i = 0; i <= 30; i += 5) {
        it(`side = ${i}`, () => {
          const point = getPointFromCell(i, 0, 0)

          expect(point).toBe(0)
        })

        it(`paddingSide = ${i}`, () => {
          const point = getPointFromCell(0, i, 0)

          expect(point).toBe(0)
        })

        it(`cellSize = ${i}`, () => {
          const point = getPointFromCell(0, 0, i)

          expect(point).toBe(0)
        })
      }
    })
  })

  // TODO: add tests for random values of args
})
