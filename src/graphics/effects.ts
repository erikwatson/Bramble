import { ColourShiftOptions, DropShadowOptions, StrokeGlowOptions } from "../types"
import { merge } from "../utils/object"
import { freshContext } from "./common"
import { defaultDropShadow } from "./defaults"

export function shadow(
  ctx: CanvasRenderingContext2D,
  drawingOperations: () => void,
  options: DropShadowOptions = defaultDropShadow
) {
  freshContext(ctx, () => {
    options = merge(defaultDropShadow, options)

    ctx.shadowColor = options.shadowColour
    ctx.shadowBlur = options.shadowBlur
    ctx.shadowOffsetX = options.shadowOffsetX
    ctx.shadowOffsetY = options.shadowOffsetY

    drawingOperations()
  })
}

export function dodge(ctx: CanvasRenderingContext2D, drawingOperations: () => void) {
  freshContext(ctx, () => {
    ctx.globalCompositeOperation = 'color-dodge'
    drawingOperations()
  })
}

export function overlay(ctx: CanvasRenderingContext2D, drawingOperations: () => void) {
  freshContext(ctx, () => {
    ctx.globalCompositeOperation = 'overlay'
    drawingOperations()
  })
}

export function transparency(
  ctx: CanvasRenderingContext2D,
  drawingOperations: () => void,
  alpha = 0.25
) {
  freshContext(ctx, () => {
    ctx.globalAlpha *= alpha
    drawingOperations()
  })
}

export function multiply(
  ctx: CanvasRenderingContext2D,
  drawingOperations: () => void
) {
  freshContext(ctx, () => {
    ctx.globalCompositeOperation = 'multiply'
    drawingOperations()
  })
}

export function screen(
  ctx: CanvasRenderingContext2D,
  drawingOperations: () => void
) {
  freshContext(ctx, () => {
    ctx.globalCompositeOperation = 'screen'
    drawingOperations()
  })
}

export function blur(
  ctx: CanvasRenderingContext2D,
  drawingOperations: () => void,
  radius = 4 // default blur radius in px
) {
  // freshContext(ctx, () => {
    ctx.filter = `blur(${radius}px)`
    drawingOperations()
  // })
}

export const defaultColourShift = {
  hue: 0,
  saturate: 1
}

export function colourShift(
  ctx: CanvasRenderingContext2D,
  drawingOperations: () => void,
  options: ColourShiftOptions = defaultColourShift
) {
  freshContext(ctx, () => {
    const { hue, saturate } = options
    ctx.filter = `hue-rotate(${hue}deg) saturate(${saturate})`
    drawingOperations()
  })
}

export const defaultStrokeGlow = {
  color: 'white',
  blur: 8
}

export function strokeGlow(
  ctx: CanvasRenderingContext2D,
  drawingOperations: () => void,
  options: StrokeGlowOptions = defaultStrokeGlow
) {
  freshContext(ctx, () => {
    ctx.shadowColor = options.color ?? 'white'
    ctx.shadowBlur = options.blur ?? 8
    ctx.shadowOffsetX = 0
    ctx.shadowOffsetY = 0
    drawingOperations()
  })
}
