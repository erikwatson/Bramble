import { Mouse, MouseState, ButtonState, WheelState } from '../types'

function create(canvas: HTMLCanvasElement): Mouse {
  const defaultState = (): MouseState => {
    return {
      position: { x: 0, y: 0 },
      left: defaultButtonState(),
      wheel: defaultWheelState(),
      right: defaultButtonState()
    }
  }

  const defaultButtonState = (): ButtonState => {
    return {
      pressed: false,
      justPressed: false,
      released: false,
      justReleased: false
    }
  }

  const defaultWheelState = (): WheelState => {
    const buttonState = defaultButtonState()
    return {
      ...buttonState,
      moved: false,
      direction: 'up'
    }
  }

  let prevMouse = defaultState()
  let mouse = defaultState()

  const clone = (state: MouseState): MouseState => {
    return Object.assign({}, state)
  }

  const relative = (event: MouseEvent) => {
    const bounds = canvas.getBoundingClientRect()

    return {
      x: event.clientX - bounds.left,
      y: event.clientY - bounds.top
    }
  }

  const move = (event: MouseEvent) => {
    const newPos = relative(event)
    mouse.position = newPos
  }

  const down = (event: MouseEvent) => {
    switch (event.which) {
      case 1:
        if (!mouse.left.pressed) {
          mouse.left.justPressed = true
        }

        mouse.left.pressed = true
        break

      case 2:
        if (!mouse.wheel.pressed) {
          mouse.wheel.justPressed = true
        }

        mouse.wheel.pressed = true
        break

      case 3:
        if (!mouse.right.pressed) {
          mouse.right.justPressed = true
        }

        mouse.right.pressed = true
        break
    }
  }

  const up = (event: MouseEvent) => {
    switch (event.which) {
      case 1:
        if (!mouse.left.released) {
          mouse.left.justReleased = true
        }

        mouse.left.released = true
        mouse.left.pressed = false
        break

      case 2:
        if (!mouse.wheel.released) {
          mouse.wheel.justReleased = true
        }

        mouse.wheel.released = true
        mouse.wheel.pressed = false
        break

      case 3:
        if (!mouse.right.released) {
          mouse.right.justReleased = true
        }

        mouse.right.released = true
        mouse.right.pressed = false
        break
    }
  }

  const wheel = (event: WheelEvent) => {
    mouse.wheel.moved = event.deltaY === 0 ? false : true

    if (mouse.wheel.moved !== false) {
      mouse.wheel.direction = event.deltaY < 0 ? 'up' : 'down'
    }
  }

  const update = () => {
    mouse.wheel.moved = false

    mouse.left.justPressed = false
    mouse.right.justPressed = false
    mouse.left.justReleased = false
    mouse.right.justReleased = false
    mouse.wheel.justPressed = false
    mouse.wheel.justReleased = false

    prevMouse = clone(mouse)
  }

  const start = () => {
    // mouse events
    canvas.addEventListener('mousemove', move)
    canvas.addEventListener('mousedown', down)
    canvas.addEventListener('mouseup', up)
    canvas.addEventListener('wheel', wheel)

    // default mouse position, center of screen
    mouse.position.x = canvas.width / 2
    mouse.position.y = canvas.height / 2
  }

  return {
    getState: () => mouse,
    start,
    update
  }
}

export default { create }
