import { Sprite, Frame } from './types'

function create(
  x: number = 0,
  y: number = 0,
  width: number = 0,
  height: number = 0,
  rotation: number = 0,
  texture: CanvasImageSource,
  colour: string = '#ffffff'
): Sprite {
  let frames: Frame[] = []

  return {
    width,
    height,
    texture,
    colour,
    frame: 0,

    setFrames: (newFrames: Frame[]): void => {
      frames = newFrames
    },

    addFrame: (frame: Frame): void => {
      frames.push(frame)
    },

    get frames(): Frame[] {
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
