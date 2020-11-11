import gfx from './graphics'
import { mouse, keyboard } from './input'

const create = () => {
  let backgroundColor = '#000000'

  let update = null
  let render = null

  // These are used for calculating the Delta Time for the Frame
  let prevTime = 0
  let frameTime = 0

  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  const graphics = gfx.create(ctx)

  canvas.id = 'bramble-game'

  let mouseInput = null //  mouse.create(canvas.element)

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
      graphics.clear(backgroundColor)
      render(graphics)
    }

    mouseInput.update()
    window.requestAnimationFrame(step)
  }

  const start = () => {
    mouseInput = mouse.create(canvas)
    mouseInput.start()
    window.requestAnimationFrame(step)
  }

  const setSize = (width, height) => {
    canvas.width = width
    canvas.height = height
  }

  const attachTo = element => {
    element.appendChild(canvas)
  }

  // NOTE: Must be called AFTER anything that would change our context.
  //       setSize for example.
  const setSmoothing = (to = true) => {
    ctx.imageSmoothingEnabled = to
  }

  const disableContextMenu = () => {
    canvas.addEventListener('contextmenu', e => {
      e.preventDefault()
    })
  }

  return {
    setSize,
    setUpdate,
    setRender,
    setBackgroundColor,
    attachTo,
    disableContextMenu,
    setSmoothing,
    start,
    getMouseState: () => mouseInput.getState()
  }
}

export default {
  create
}
