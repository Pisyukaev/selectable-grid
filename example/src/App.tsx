import React, { useEffect, useRef, useState } from 'react'

import { SelectableGrid } from 'selectable-grid'
import 'selectable-grid/dist/index.css'

interface Size {
  width: number
  height: number
  aspect: number
}

const App = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)

  const [containerSize, setContainerSize] = useState<Size | undefined>(
    undefined
  )
  const [imgSize, setImgSize] = useState<Size | undefined>(undefined)

  useEffect(() => {
    if (!containerRef.current || !imgRef.current) {
      return
    }

    const { offsetWidth: containerWidth, offsetHeight: containerHeight } =
      containerRef.current

    setContainerSize({
      width: containerWidth,
      height: containerHeight,
      aspect: containerWidth / containerHeight
    })
  }, [])

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
        ref={imgRef}
        src='https://all-t-shirts.ru/goods_images/ru110593II00039d6336575d4ab6f3960422a337e0e78.jpg'
        alt=''
        onLoad={handleLoad}
      />

      <SelectableGrid containerSize={containerSize} imgSize={imgSize} />
    </div>
  )
}

export default App
