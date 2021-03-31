import allKeys from './keys'
import { Keyboard, Key, KeyState, KeyboardState } from '../types'

let keys = defaultState()

function defaultState(): KeyboardState {
  const defaultState = {
    pressed: false,
    justPressed: false,
    released: false,
    justReleased: false
  }

  return allKeys.reduce((acc, key: Key) => {
    const label = key.name
    delete key['label']

    acc[label] = { ...key, ...defaultState }

    return acc
  }, {})
}

function preventDefaultArrows(event: KeyboardEvent) {
  const keys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']

  if (keys.includes(event.key)) {
    event.preventDefault()
  }
}

function getKey(event: KeyboardEvent, keys: KeyboardState): Key {
  let result: KeyState = null
  const objectKeys = Object.keys(keys)

  for (let i = 0; i < objectKeys.length; i++) {
    if (keys[objectKeys[i]].code === event.code) {
      result = keys[objectKeys[i]]
    }
  }

  if (!result) {
    console.error(`No key definition found for ${event.code}`)
  }

  return result
}

function down(event: KeyboardEvent) {
  preventDefaultArrows(event)

  const key = getKey(event, keys)

  key.pressed = true
}

function up(event: KeyboardEvent) {
  const key = getKey(event, keys)

  key.pressed = false
}

function update() {}

function start() {
  // keyboard events
  document.addEventListener('keydown', down)
  document.addEventListener('keyup', up)
}

function create(): Keyboard {
  return {
    start,
    update,
    getState: () => keys
  }
}

export default { create }
