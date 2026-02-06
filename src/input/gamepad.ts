function create() {
  const gamepad = {}

  const connected = (e: GamepadEvent) => {
    console.info(e.gamepad)
  }

  const disconnected = (e: GamepadEvent) => {
    console.info(e.gamepad)
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
