import SelectableGrid from 'selectable-grid'

const init = () => {
  const img = document.querySelector<HTMLImageElement>('img')

  if (!img) {
    return
  }

  img.addEventListener('load', () => {
    new SelectableGrid({
      imageContainer: img,
      cellCount: 15
    })
  })
}

init()
