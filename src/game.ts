import gfx from './graphics'
import { mouse, keyboard } from './input'
import { Game, Mouse, Keyboard, Graphics } from './types'

const create = (): Game => {
  let backgroundColor = null

  let update: (dt: number) => void = null
  let render: (gfx: Graphics) => void = null

  // used for calculating the Delta Time for the Frame
  let prevTime = 0

  const canvas: HTMLCanvasElement = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  const graphics = gfx.create(ctx)

  canvas.id = 'bramble-game'

  let mouseInput: Mouse = mouse.create(canvas)
  let keyboardInput: Keyboard = keyboard.create()

  const setBackgroundColor = (color: string) => {
    backgroundColor = color
  }

  const attachTo = (element: Element) => {
    element.appendChild(canvas)
  }

  const setUpdate = (callback: (dt: number) => void) => {
    update = callback
  }

  const setRender = (callback: (gfx: Graphics) => void) => {
    render = callback
  }

  const step = () => {
    if (update) {
      update((performance.now() - prevTime) / 1000)
    }

    if (render) {
      if (backgroundColor) {
        graphics.clear(backgroundColor)
      }

      render(graphics)
    }

    mouseInput.update()
    keyboardInput.update()

    window.requestAnimationFrame(step)
    prevTime = performance.now()
  }

  const start = () => {
    mouseInput.start()
    keyboardInput.start()
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
    attachTo,
    setSize: setSize,
    setUpdate,
    setRender,
    setBackgroundColor,
    canvas,
    disableContextMenu,
    setSmoothing,
    start,
    getMouseState: () => mouseInput.getState(),
    getKeyboardState: () => keyboardInput.getState()
  }
}

export default {
  create
}
