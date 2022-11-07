import SelectableGrid from 'selectable-grid'

const init = () => {
  const img = document.querySelector<HTMLImageElement>('img')

  if (!img) {
    return
  }

  img.addEventListener('load', () => {
    new SelectableGrid({
      imageContainer: img,
      cellCount: 15,
      mouseDown: () => {
        console.log('down')
      },
      mouseMove: () => {
        console.log('move')
      },
      mouseUp: () => {
        console.log('up')
      },
      gridStyles: {
        strokeStyle: '#000'
      },
      // cellsStyles: {
      //   fillStyle: '#ff0000'
      // }
      areaStyles: {
        // fillStyle: '#ff0000',
        strokeStyle: '#0000ff'
      }
    })
  })
}

init()
