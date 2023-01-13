import React from 'react'
import SelectableGrid from '@selectable-grid/react'

const App = () => {
  return (
    <div style={{ position: 'relative' }}>
      <SelectableGrid
        cellCount={20}
        type='img'
        containerProps={{
          src: 'spanch-bob.webp',
          alt: 'Spanch Bob',
          height: 500
        }}
      />
    </div>
  )
}

export default App
