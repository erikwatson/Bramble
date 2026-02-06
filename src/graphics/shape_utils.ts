import { CircleOptions, LineOptions, RectangleOptions } from "../types"

export function shouldDrawLine(options: LineOptions) {
  return options.opacity !== 0 && options.width !== 0
}

export function shouldDrawOutline(options: CircleOptions | RectangleOptions) {
  return options.line.opacity !== 0 && options.line.width !== 0
}

export function shouldDrawFill(options: CircleOptions | RectangleOptions) {
  return options.fill.opacity !== 0
}

export function shouldSinglePass(options: CircleOptions | RectangleOptions) {
  return options.fill.opacity === 1 && options.line.opacity === 1 && options.line.width > 0
}
