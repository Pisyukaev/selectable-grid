# selectable-grid

## Small description

A React component library that allows you to select the desired area within a container and get the dimensions and coordinates of the selected area

[Live demo](https://pisyukaev.github.io/selectable-grid/)

[![NPM](https://img.shields.io/npm/v/selectable-grid.svg)](https://www.npmjs.com/package/selectable-grid) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

* * *


## Example

- Example for select area

![patrick](https://i.ibb.co/hBbts3M/patrik.gif)

- Example for responsive grid

![responsive patrick](https://i.ibb.co/ypRYKYt/ezgif-com-gif-maker.webp)

* * *

## Install

```bash
npm install --save selectable-grid
```

* * *

## Usage

Example for image in the div element

```tsx
import React, { useRef, useState } from 'react'

import { SelectableGrid } from 'selectable-grid'
import 'selectable-grid/dist/index.css'
import { Point, AreaInfo, Size } from '../../dist/types'

const App = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const [imgSize, setImgSize] = useState<Size | undefined>(undefined)

  const handleLoad = ({
    currentTarget: { naturalWidth, naturalHeight }
  }: React.SyntheticEvent<HTMLImageElement>) => {
    setImgSize({
      width: naturalWidth,
      height: naturalHeight,
      aspect: naturalWidth / naturalHeight
    })
  }

  return (
    <div ref={containerRef} className='container'>
      <img
        className='img'
        ref={imgRef}
        src='https://all-t-shirts.ru/goods_images/ru110593II00039d6336575d4ab6f3960422a337e0e78.jpg'
        alt=''
        onLoad={handleLoad}
      />

      <SelectableGrid
        container={containerRef.current}
        imgSize={imgSize}
        onMouseDown={(e: React.MouseEvent, downPosition: Point) => {
          console.log('event => ', e)
          console.log('downPosition => ', downPosition)
        }}
        onMouseMove={(e: React.MouseEvent, areaInfo: AreaInfo) => {
          console.log('event => ', e)
          console.log('areaInfo => ', areaInfo)
        }}
        onMouseUp={(e: React.MouseEvent, areaInfo: AreaInfo) => {
          console.log('event => ', e)
          console.log('areaInfo => ', areaInfo)
        }}
      />
    </div>
  )
}
```
* * *

## Props description

|Prop name|Prop type|
|---|---|
|container|HTMLDivElement \| null|
|imgSize?| {<br/>width: number; <br/>height: number;<br/> aspect: number;<br/>}|
|cellSize|number|
|onMouseDown|(e: React.MouseEvent, startDownPosition: `Point`) => void|
|container|HTMLDivElement \| null|
|onMouseMove|(e: React.MouseEvent, areaInfo: `AreaInfo`) => void|
|onMouseUp|(e: React.MouseEvent, areaInfo: `AreaInfo`) => void|
|gridStyles|{<br/>strokeStyle?: CanvasFillStrokeStyles['strokeStyle']<br/>lineDashOffset?: CanvasFillStrokeStyles['lineDashOffset']<br/>lineDash?: number[]<br/>}|
|selectAreaStyles|{<br/>strokeStyle?: CanvasFillStrokeStyles['strokeStyle']<br/>fillStyle?: CanvasFillStrokeStyles['fillStyle']<br/>lineDash?: CanvasFillStrokeStyles['lineDash']<br/>}|
|cellsStyles|{<br/>strokeStyle?: CanvasFillStrokeStyles['strokeStyle']<br/>fillStyle?: CanvasFillStrokeStyles['fillStyle']<br/>}|

- Point: `x: number, y: number`;
- AreaInfo: `area: {x: number, y: number, w: number, h: number}, areaInPx: {top: number, left: number, right: number, bottom: number}, areaInPercent: {top: number, left: number, right: number, bottom: number}`

* * *

> Made with [create-react-library](https://www.npmjs.com/package/create-react-library)

## License

MIT © [Pisyukaev](https://github.com/Pisyukaev)
