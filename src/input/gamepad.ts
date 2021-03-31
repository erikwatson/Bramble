function create() {
  const gamepad = {}

  const connected = (e: GamepadEvent) => {
    console.log(e.gamepad)
  }

  const disconnected = (e: GamepadEvent) => {
    console.log(e.gamepad)
  }

  const start = () => {
    window.addEventListener('gamepadconnected', connected)
    window.addEventListener('gamepaddisconnected', disconnected)
  }

  const update = () => {}

  return {
    getState: () => gamepad,
    start,
    update
  }
}

export default { create }
