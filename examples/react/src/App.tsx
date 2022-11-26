import React, { useRef, useState } from 'react'
import SelectableGrid from '@selectable-grid/react'

import spanchBobSrc from './img/spanch-bob.webp'

const App = () => {
  const imgRef = useRef<HTMLImageElement>()
  const [_, setIsLoad] = useState(false)
  return (
    <div style={{ position: 'relative' }}>
      <img
        ref={imgRef}
        src={spanchBobSrc}
        alt=''
        height={500}
        onLoad={() => setIsLoad(true)}
      />
      <SelectableGrid cellCount={20} imageContainer={imgRef.current} />
    </div>
  )
}

export default App
