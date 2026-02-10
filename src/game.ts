import assets from './assets'
import graphics from './graphics'
import { mouse, keyboard } from './input'
import renderer from './renderer'
import sounds from './sounds'
import {
  Game,
  Mouse,
  Keyboard,
  InputState,
  UpdateCallbackOptions,
  RenderCallbackOptions
} from './types'

const create = (): Game => {
  let backgroundColor = null

  let update: (options: UpdateCallbackOptions) => void = null
  let render: (options: RenderCallbackOptions) => void = null

  // used for calculating the Delta Time for the Frame
  let prevTime = 0

  const canvas: HTMLCanvasElement = document.createElement('canvas')
  const graphicsContext = canvas.getContext('2d')
  const audioContext = new AudioContext()
  const gfx = graphics.create(graphicsContext)
  const sfx = sounds.create(audioContext)
  const assetManager = assets.create()
  const ren = renderer.create(graphicsContext)

  canvas.id = 'bramble-game'

  let mouseInput: Mouse = mouse.create(canvas)
  let keyboardInput: Keyboard = keyboard.create(canvas)

  const setBackgroundColor = (color: string) => {
    backgroundColor = color
  }

  const attachTo = (element: Element) => {
    element.appendChild(canvas)
  }

  const setUpdate = (callback: (options: UpdateCallbackOptions) => void) => {
    update = callback
  }

  const setRender = (callback: (options: RenderCallbackOptions) => void) => {
    render = callback
  }

  const inputState: InputState = {
    keyboard: keyboardInput.getState(),
    mouse: mouseInput.getState(),
  }

  const step = () => {
    if (update) {
      inputState.keyboard = keyboardInput.getState()
      inputState.mouse = mouseInput.getState()

      update({
        dt: (performance.now() - prevTime) / 1000,
        input: inputState,
        sfx,
        assets: assetManager.assets
      })
    }

    if (render) {
      if (backgroundColor) {
        gfx.clear(backgroundColor)
      }

      render({ gfx: ren, assets: assetManager.assets })
      ren.render()
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
    graphicsContext.imageSmoothingEnabled = to
  }

  const disableContextMenu = () => {
    canvas.addEventListener('contextmenu', e => {
      e.preventDefault()
    })
  }

  const stop = () => {
    canvas.remove()
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
    start,
    stop,
    assets: assetManager
  }
}

export default {
  create
}
