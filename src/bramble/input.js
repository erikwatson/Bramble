import { canvas } from './canvas'
import allKeys from './keys'

function defaultKeyState () {
  const defaultState = {
    pressed: false,
    released: false
  }

  return allKeys.reduce((acc, key) => {
    const label = key.label
    delete key['label']

    acc[label] = { ...key, ...defaultState }

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

function preventDefaultArrows (event) {
  const keys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']

  if (keys.includes(event.key)) {
    event.preventDefault()
  }
}

function getKey (event, keys) {
  let result = null
  const objectKeys = Object.keys(keys)

  for (let i = 0; i < objectKeys.length; i++) {
    if (keys[objectKeys[i]].code === event.keyCode) {
      result = keys[objectKeys[i]]
    }
  }

  return result
}

function keyDown (event) {
  preventDefaultArrows(event)

  const key = getKey(event, keys)

  key.pressed = true
}

function keyUp (event) {
  const key = getKey(event, keys)

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

  // default mouse position, center of screen
  mouse.x = canvas.width / 2
  mouse.y = canvas.height / 2
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
