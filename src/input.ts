import Mouse from './input/mouse'
import Keyboard from './input/keyboard'
import Gamepad from './input/gamepad'

function createMouse(canvas: HTMLCanvasElement) {
  const mouseInput = Mouse.create(canvas)

  return {
    start: () => mouseInput.start(),
    update: () => mouseInput.update(),
    getState: () => mouseInput.getState()
  }
}

function createKeyboard(canvas: HTMLCanvasElement) {
  const keyboardInput = Keyboard.create(canvas)

  return {
    start: () => keyboardInput.start(),
    update: () => keyboardInput.update(),
    getState: () => keyboardInput.getState()
  }
}

function createGamepad() {
  const gamepadInput = Gamepad.create()

  return {
    start: () => gamepadInput.start(),
    update: () => gamepadInput.update(),
    getState: () => gamepadInput.getState()
  }
}

export const mouse = {
  create: createMouse
}

export const keyboard = {
  create: createKeyboard
}

export const gamepad = {
  create: createGamepad
}
