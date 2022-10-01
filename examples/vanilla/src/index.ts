import SelectableGrid from 'selectable-grid'

const init = () => {
  const img = document.getElementById('img')

  if (!img) {
    return
  }

  new SelectableGrid({
    imageContainer: img as HTMLImageElement,
    cellCount: 5
  })
}

init()
