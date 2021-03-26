import gfx from './graphics'
import { mouse, keyboard } from './input'
import { Game, Mouse, MouseState, Graphics } from './types'

const create = (): Game => {
  let backgroundColor = '#000000'

  let update: (dt: number) => void = null
  let render: (gfx: Graphics) => void = null

  // These are used for calculating the Delta Time for the Frame
  let prevTime = 0
  let frameTime = 0

  const canvas: HTMLCanvasElement = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  const graphics = gfx.create(ctx)

  canvas.id = 'bramble-game'

  let mouseInput: Mouse = mouse.create(canvas)

  const setBackgroundColor = (color: string) => {
    backgroundColor = color
  }

  const setUpdate = (callback: (dt: number) => void) => {
    update = callback
  }

  const setRender = (callback: (gfx: Graphics) => void) => {
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

  const setSize = (width: number, height: number) => {
    canvas.width = width
    canvas.height = height
  }

  // Smoothing must be re-applied if any of the following is called
  //   - setSize
  const setSmoothing = (to = true) => {
    ctx.imageSmoothingEnabled = to
  }

  const disableContextMenu = () => {
    canvas.addEventListener('contextmenu', e => {
      e.preventDefault()
    })
  }

  return {
    setSize: setSize,
    setUpdate,
    setRender,
    setBackgroundColor,
    canvas,
    disableContextMenu,
    setSmoothing,
    start,
    getMouseState: () => mouseInput.getState()
  }
}

export default {
  create
}
