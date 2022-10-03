import SelectableGrid from 'selectable-grid'

const init = () => {
  const img = document.getElementById('img')

  if (!img) {
    return
  }

  img.addEventListener('load', () => {
    new SelectableGrid({
      imageContainer: img as HTMLImageElement,
      cellCount: 15
    })
  })
}

init()
