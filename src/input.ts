import Mouse from './input/mouse'

function create(canvas: HTMLCanvasElement) {
  const mouseInput = Mouse.create(canvas)

  const start = () => {
    mouseInput.start()
  }

  const update = () => {
    mouseInput.update()
  }

  return {
    start,
    update,
    getState: () => mouseInput.getState()
  }
}

export const mouse = {
  create
}

export const keyboard = {
  create: () => {
    console.log('keyboard input stub')
  }
}
