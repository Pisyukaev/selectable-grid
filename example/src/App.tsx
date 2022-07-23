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
          console.log('🚀 ~ areaInfo', areaInfo)
        }}
        onMouseUp={(e: React.MouseEvent, areaInfo: AreaInfo) => {
          console.log('event => ', e)
          console.log('🚀 ~ areaInfo', areaInfo)
        }}
      />
    </div>
  )
}

export default App
