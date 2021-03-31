import Mouse from './input/mouse'
import Keyboard from './input/keyboard'

function createMouse(canvas: HTMLCanvasElement) {
  const mouseInput = Mouse.create(canvas)

  return {
    start: () => mouseInput.start(),
    update: () => mouseInput.update(),
    getState: () => mouseInput.getState()
  }
}

function createKeyboard() {
  const keyboardInput = Keyboard.create()

  return {
    start: () => keyboardInput.start(),
    update: () => keyboardInput.update(),
    getState: () => keyboardInput.getState()
  }
}

export const mouse = {
  create: createMouse
}

export const keyboard = {
  create: createKeyboard
}
