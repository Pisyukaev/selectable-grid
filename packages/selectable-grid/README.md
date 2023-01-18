# selectable-grid

## Install
```bash
npm install --save selectable-grid
```

## Usage example

```js
import SelectableGrid from 'selectable-grid'

const init = () => {
  const img = document.querySelector('img')

  if (!img) {
    return
  }

  img.addEventListener('load', () => {
    new SelectableGrid({
      container: img,
      cellCount: 15,
    })
  })
}

init()

```

## Properties
| Property | Required | Type | Description |
|----------|----------|------|-------------|
| `container` | `true` | `HTMLImageElement` \| `HTMLVideoElement` | `img` or `video` node |
| `cellCount` | `true` | `number` | count of the cell in the grid |
| `mouseMove` | `false` | `function(area: {x: number, y: number, w: number, h: number}, selectArea: {x: number, y: number, w: number, h: number}, e: MouseEvent){}` | handler of mouse move on the grid |
| `mouseDown` | `false` | `(point: {x: number, y:number}, e: MouseEvent) => void` | handler of mouse down on the grid |
| `mouseUp` | `false` | `(area: {x: number, y: number, w: number, h: number}, selectArea: {x: number, y: number, w: number, h: number}, e: MouseEvent) => void` | handler of mouse up on the grid |
| `cellsStyles` | `false` | `{fillStyle: string}` | color like as color for canvas |
| `gridStyles` | `false` | `{strokeStyle: string}` | color like as color for canvas |
| `areaStyles` | `false` | `{strokeStyle: string, fillStyle: string}` | color like as color for canvas |
| `isArea` | `false` | `boolean` | show area on the grid |
| `keepArea` | `false` | `boolean` | show area on the grid |
| `isCells` | `false` | `boolean` | render cells on the grid |
| `isGrid` | `false` | `boolean` | render grid on the grid |
| `canvasClassName` | `false` | `string` | class name of the canvas |

* * *

## Another packages

[@selectable-grid/react](https://github.com/Pisyukaev/selectable-grid/tree/main/packages/react)

[@selectable-grid/vue](https://github.com/Pisyukaev/selectable-grid/tree/main/packages/vue)
