import gfx from './graphics'

export const canvas = document.createElement('canvas')
const ctx = canvas.getContext('2d')

function setSize (width, height) {
  canvas.width = width
  canvas.height = height
}

function attachTo (element) {
  element.appendChild(canvas)
  gfx.setContext(ctx)
}

export default {
  element: canvas,
  ctx,
  setSize,
  attachTo
}
