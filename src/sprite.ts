import { Sprite, Frame, Point, Size } from './types'

function create(
  position: Point,
  size: Size,
  rotation: number = 0,
  texture: HTMLImageElement,
  colour: string = '#ffffff'
): Sprite {
  let frames: Frame[] = []

  return {
    size,
    texture,
    colour,
    frame: 0,
    position,

    setFrames: (newFrames: Frame[]): void => {
      frames = newFrames
    },

    addFrame: (frame: Frame): void => {
      frames.push(frame)
    },

    get frames(): Frame[] {
      return frames
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
