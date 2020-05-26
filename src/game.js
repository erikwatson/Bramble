import canvas from './canvas'
import gfx from './graphics'
import { mouse, keyboard } from './input'

const create = () => {
  let backgroundColor = '#000000'

  let update = null
  let render = null

  // These are used for calculating the Delta Time for the Frame
  let prevTime = 0
  let frameTime = 0

  const mouseInput = mouse.create(canvas.element)

  const setBackgroundColor = color => {
    backgroundColor = color
  }

  const setUpdate = callback => {
    update = callback
  }

  const setRender = callback => {
    render = callback
  }

  const step = () => {
    if (update) {
      update(1 / 60) // TODO: fake it at 60fps for now
    }

    if (render) {
      gfx.clear(backgroundColor)
      render()
    }

    mouseInput.update()
    window.requestAnimationFrame(step)
  }

  const start = () => {
    mouseInput.start()
    window.requestAnimationFrame(step)
  }

  return {
    setSize: canvas.setSize,
    setUpdate,
    setRender,
    setBackgroundColor,
    attachTo: canvas.attachTo,
    disableContextMenu: canvas.disableContextMenu,
    setSmoothing: canvas.setSmoothing,
    start
  }
}

export default {
  create
}
