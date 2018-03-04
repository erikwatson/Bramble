let canvas = document.createElement('canvas')
let ctx = canvas.getContext('2d')

let size = { width: 0, height: 0 }

function setSize (width, height) {
  size = { width, height }

  canvas.width = size.width
  canvas.height = size.height
}

function attachTo (element) {
  element.append(canvas)
}

function setBackgroundColor (color) {
  ctx.fillStyle = color
  ctx.fillRect(0, 0, size.width, size.height)
}

export default {
  setSize,
  attachTo,
  setBackgroundColor
}
