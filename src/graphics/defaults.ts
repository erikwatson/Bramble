import { CircleOptions, DropShadowOptions, LineOptions, RectangleOptions, TextOptions, TransformOptions } from "../types";

export const defaultDropShadow: DropShadowOptions = {
  shadowcolour: '#000000',
  shadowBlur: 6,
  shadowOffsetX: 4,
  shadowOffsetY: 4
}

export const defaultRect: RectangleOptions = {
  fill: {
    colour: '#000000',
    opacity: 1
  },
  line: {
    width: 1,
    colour: '#FFFFFF',
    opacity: 1
  }
}

export const defaultLine: LineOptions = {
  width: 1,
  colour: '#FFFFFF',
  opacity: 1
}

export const defaultCircle: CircleOptions = {
  fill: {
    colour: '#000000',
    opacity: 1
  },

  line: {
    colour: '#FFFFFF',
    opacity: 1,
    width: 1
  }
}

export const defaultText: TextOptions = {
  colour: '#000000',
  size: '16pt',
  family: 'sans-serif',
  align: 'left',
  baseline: 'top'
}

export const defaultTransform: TransformOptions = {
  rotation: 0,
  scale: 1,
  around: { x: 0, y: 0 }
}
