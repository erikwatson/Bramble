interface Frame {
  x: number
  y: number
  width: number
  height: number
}

export interface Sprite {
  x: number
  y: number
  rotation: number
  width: number
  height: number
  frames: Frame[]
  frame: number
  texture
  colour: string
  setFrames
  addFrame
}

function create(
  x = 0,
  y = 0,
  width = 0,
  height = 0,
  rotation = 0,
  texture = null,
  colour = '#ffffff'
): Sprite {
  let frames = []

  return {
    width,
    height,
    texture,
    colour,
    frame: 0,

    setFrames: newFrames => {
      frames = newFrames
    },

    addFrame: frame => {
      frames.push(frame)
    },

    get frames() {
      return frames
    },

    get x() {
      return x
    },

    set x(newX) {
      x = newX
    },

    get y() {
      return y
    },

    set y(newY) {
      y = newY
    },

    get rotation() {
      return rotation
    },

    set rotation(degrees) {
      rotation = degrees >= 360 ? 360 - degrees : degrees
    }
  }
}

export default {
  create
}
