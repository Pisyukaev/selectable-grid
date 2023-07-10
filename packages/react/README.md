# @selectable-grid/react

## Install

```bash
npm install --save @selectable-grid/react
```

## Usage example

```jsx
import React from 'react'
import SelectableGrid from '@selectable-grid/react'

const App = () => {
  return (
    <div style={{ position: 'relative' }}>
      <SelectableGrid
        cellCount={20}
        type='img'
        containerProps={{
          src: 'spanch-bob.webp'
        }}
      />
    </div>
  )
}

export default App
```

## Properties

| Property | Required | Type | Description |
|----------|----------|------|-------------|
| `type` | `true` | `'img'` \| `'video'` | name of html tag |
| `containerProps` | `true` | `object` | if prop `type` is equal `'img'` `containerProps` is HTML Attributes of the `<img />` tag, else prop `type` is equal `'video'` `containerProps` is HTML Attributes of the `<video />` |
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

[selectable-grid](https://github.com/Pisyukaev/selectable-grid/tree/main/packages/selectable-grid)

[@selectable-grid/react](https://github.com/Pisyukaev/selectable-grid/tree/main/packages/vue)
