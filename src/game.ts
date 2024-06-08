import gfx from './graphics'
import { mouse, keyboard } from './input'
import {
  Game,
  Mouse,
  Keyboard,
  Graphics,
  InputState
} from './types'

const create = (): Game => {
  let backgroundColor = null

  let update: (dt: number, input: InputState) => void = null
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

  const setUpdate = (callback: (dt: number, input: InputState) => void) => {
    update = callback
  }

  const setRender = (callback: (gfx: Graphics) => void) => {
    render = callback
  }

  const inputState: InputState = {
    keyboard: null,
    mouse: null,
  }

  const step = () => {
    if (update) {
      inputState.keyboard = keyboardInput.getState()
      inputState.mouse = mouseInput.getState()

      update((performance.now() - prevTime) / 1000, inputState)
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
    setSize,
    setUpdate,
    setRender,
    setBackgroundColor,
    canvas,
    disableContextMenu,
    setSmoothing,
    start
  }
}

export default {
  create
}
