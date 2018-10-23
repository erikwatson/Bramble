import { canvas } from '../canvas'

let prevMouse = defaultState()
let mouse = defaultState()

function diff () {
  let result = {}

  if (prevMouse.x !== mouse.x) {
    result['x'] = mouse.x
  }

  if (prevMouse.y !== mouse.y) {
    result['y'] = mouse.y
  }

  if (prevMouse.pressed !== mouse.pressed) {
    result['pressed'] = mouse.pressed
  }

  if (prevMouse.justPressed !== mouse.justPressed) {
    result['justPressed'] = mouse.justPressed
  }

  if (prevMouse.released !== mouse.released) {
    result['released'] = mouse.released
  }

  if (prevMouse.justReleased !== mouse.justReleased) {
    result['justReleased'] = mouse.justReleased
  }

  return result
}

function defaultState () {
  return {
    x: 0,
    y: 0,
    pressed: false,
    justPressed: false,
    released: false,
    justReleased: false,
    diff
  }
}

function clone (state) {
  return Object.assign({}, state)
}

function relative (event, element) {
  const bounds = canvas.getBoundingClientRect()

  return {
    x: event.clientX - bounds.left,
    y: event.clientY - bounds.top
  }
}

function move (event) {
  const newPos = relative(event, canvas)

  mouse.x = newPos.x
  mouse.y = newPos.y
}

function down (event) {
  mouse.pressed = true
}

function up (event) {
  mouse.pressed = false
}

function update () {
  prevMouse = clone(mouse)
}

function start () {
  // mouse events
  canvas.addEventListener('mousemove', move)
  canvas.addEventListener('mousedown', down)
  canvas.addEventListener('mouseup', up)

  // default mouse position, center of screen
  mouse.x = canvas.width / 2
  mouse.y = canvas.height / 2
}

export default {
  start,
  update,
  state: mouse
}
