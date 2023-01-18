# @selectable-grid/react

## Install
```bash
npm install --save @selectable-grid/react
```

## Usage example

```html
<script setup lang="ts">
import { ref } from 'vue'
import SelectableGrid from '@selectable-grid/vue'
import type { SelectableGridProps } from '@selectable-grid/vue'

const imgSrc = 'image_link'

const options = ref<SelectableGridProps>({
  type: 'img',
  cellCount: 15,
  containerProps: {
    id: 'img',
    src: imgSrc,
    width: 500
  }
})
</script>

<template>
  <div class="image-container">
    <SelectableGrid :options="options" />
  </div>
</template>

<style scoped>
#img {
  height: 500px;
}
</style>
```

## Properties
| Property | Required | Type | Description |
|----------|----------|------|-------------|
| `options*` | `true` | `object` | see down |

## Properties of the `options*`

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

[@selectable-grid/react](https://github.com/Pisyukaev/selectable-grid/tree/main/packages/react)