import { canvas } from './canvas'

function defaultKeyState () {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  const keys = letters.concat(numbers)

  const defaultState = {
    pressed: false,
    released: false
  }

  return keys.reduce((acc, key) => {
    acc[`${key}`] = { ...defaultState }
    return acc
  }, {})
}

function relativeMouse (event, element) {
  const bounds = canvas.getBoundingClientRect()

  return {
    x: event.clientX - bounds.left,
    y: event.clientY - bounds.top
  }
}

function mouseMove (event) {
  const newPos = relativeMouse(event, canvas)

  mouse.x = newPos.x
  mouse.y = newPos.y
}

function mouseDown (event) {
  mouse.pressed = true
}

function mouseUp (event) {
  mouse.pressed = false
}

function keyDown (event) {
  const key = keys[event.key.toUpperCase()]

  key.pressed = true
}

function keyUp (event) {
  const key = keys[event.key.toUpperCase()]

  key.pressed = false
}

function start () {
  // mouse events
  canvas.addEventListener('mousemove', mouseMove)
  canvas.addEventListener('mousedown', mouseDown)
  canvas.addEventListener('mouseup', mouseUp)

  // keyboard events
  document.addEventListener('keydown', keyDown)
  document.addEventListener('keyup', keyUp)
}

function getState () {
  return {
    mouse,
    keys
  }
}

let mouse = {
  x: 0,
  y: 0,
  pressed: false,
  released: false
}

let keys = defaultKeyState()

export default {
  start,
  getState
}
