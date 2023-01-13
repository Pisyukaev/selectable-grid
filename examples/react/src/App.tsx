import React, { useRef, useState } from 'react'
import SelectableGrid from '@selectable-grid/react'

const App = () => {
  const imgRef = useRef<HTMLImageElement>()
  const [_, setIsLoad] = useState(false)

  return (
    <div style={{ position: 'relative' }}>
      <img
        ref={imgRef}
        src='spanch-bob.webp'
        alt='Spanch Bob'
        height={500}
        onLoad={() => setIsLoad(true)}
      />
      <SelectableGrid cellCount={20} imageContainer={imgRef.current} />
    </div>
  )
}

export default App
