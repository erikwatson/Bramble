import { canvas } from '../canvas'

let mouse = defaultState()

function defaultState () {
  return {
    x: 0,
    y: 0,
    pressed: false,
    justPressed: false,
    released: false,
    justReleased: false
  }
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
