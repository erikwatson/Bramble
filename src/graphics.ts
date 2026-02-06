import { Graphics } from './types'
import { clearRect } from './graphics/clear'
import {
  defaultCircle,
  defaultRect,
  defaultLine,
  defaultText,
  defaultDropShadow,
  defaultTransform
} from './graphics/defaults'
import {
  shadow,
  dodge,
  overlay,
  transparency,
  multiply as multiplyEffect,
  screen,
  blur,
  colourShift as shift,
  strokeGlow,
  defaultColourShift,
  defaultStrokeGlow
} from './graphics/effects'
import { image, subImage } from './graphics/images'
import { circle, curve, square, rect, line } from './graphics/shapes'
import { txt } from './graphics/text'
import { tiles } from './graphics/tiles'
import { rotation, transform } from './graphics/transforms'
import { sprite } from './graphics/sprites'
import { clear } from './graphics/clear'

function create(ctx: CanvasRenderingContext2D): Graphics {
  return {
    circle: (position, radius, options = defaultCircle) => {
      circle(ctx, position, radius, options)
    },
    clear: (colour?) => {
      clear(ctx, colour)
    },
    clearRect: (rectangle, colour?) => {
      clearRect(ctx, rectangle, colour)
    },
    curve: (from, to, controlPoints, options) => {
      curve(ctx, from, to, controlPoints, options)
    },
    square: (position, size, options = defaultRect) => {
      square(ctx, position, size, options)
    },
    rect: (rectangle, options = defaultRect) => {
      rect(ctx, rectangle, options)
    },
    image: (img, position, size) => {
      image(ctx, img, position, size)
    },
    line: (from, to, options = defaultLine) => {
      line(ctx, from, to, options)
    },
    sprite: spr => {
      sprite(ctx, spr)
    },
    subImage: (img, position, size, subPosition, subSize) => {
      subImage(ctx, img, position, size, subPosition, subSize)
    },
    text: (position = { x: 0, y: 0 }, text = '', options = defaultText) => {
      txt(ctx, position, text, options)
    },
    tiles: (position, tileGrid, spriteSheets, scale) => {
      tiles(ctx, position, tileGrid, spriteSheets, scale)
    },
    shadow: (drawingOperations, options = defaultDropShadow) => {
      shadow(ctx, drawingOperations, options)
    },
    dodge: drawingOperations => {
      dodge(ctx, drawingOperations)
    },
    overlay: drawingOperations => {
      overlay(ctx, drawingOperations)
    },
    transparency: (drawingOperations, alpha = 0.25) => {
      transparency(ctx, drawingOperations, alpha)
    },
    rotation: (drawingOperations, rotateBy = 0, around = { x: 0, y: 0 }) => {
      rotation(ctx, drawingOperations, rotateBy, around)
    },
    transform: (drawingOperations, options = defaultTransform) => {
      transform(ctx, drawingOperations, options)
    },
    multiply: drawingOperations => {
      multiplyEffect(ctx, drawingOperations)
    },
    screen: drawingOperations => {
      screen(ctx, drawingOperations)
    },
    blur: (drawingOperations, radius = 4) => {
      blur(ctx, drawingOperations, radius)
    },
    colourShift: (drawingOperations, options = defaultColourShift) => {
      shift(ctx, drawingOperations, options)
    },
    strokeGlow: (drawingOperations, options = defaultStrokeGlow) => {
      strokeGlow(ctx, drawingOperations, options)
    }
  }
}

export default {
  circle,
  clear,
  clearRect,
  create,
  curve,
  dodge,
  image,
  line,
  overlay,
  rotation,
  rect,
  shadow,
  sprite,
  square,
  subImage,
  text: txt,
  tiles,
  transparency
}
