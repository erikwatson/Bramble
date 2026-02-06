import { Point, RectangleOptions, Rectangle, LineOptions, CircleOptions } from "../types"
import { merge } from "../utils/object"
import { defaultRect, defaultLine, defaultCircle } from "./defaults"
import { transparency } from "./effects"
import { shouldSinglePass, shouldDrawFill, shouldDrawOutline, shouldDrawLine } from "./shape_utils"

export function square(
  ctx: CanvasRenderingContext2D,
  position: Point,
  size: number,
  options: RectangleOptions = defaultRect
) {
  rect(
    ctx,
    { x: position.x, y: position.y, width: size, height: size },
    options
  )
}

function rectOutline(ctx: CanvasRenderingContext2D, rectangle: Rectangle, options: RectangleOptions) {
  ctx.strokeStyle = options.line.colour
  ctx.lineWidth = options.line.width
  ctx.strokeRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height)
}

function rectFill(ctx: CanvasRenderingContext2D, rectangle: Rectangle, options: RectangleOptions) {
  ctx.fillStyle = options.fill.colour
  ctx.fillRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height)
}

function rectCombined(
  ctx: CanvasRenderingContext2D,
  rectangle: Rectangle,
  options: RectangleOptions
) {
  ctx.fillStyle = options.fill.colour
  ctx.strokeStyle = options.line.colour
  ctx.lineWidth = options.line.width
  ctx.fillRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height)
  ctx.strokeRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height)
}

export function rect(
  ctx: CanvasRenderingContext2D,
  rectangle: Rectangle,
  options: RectangleOptions = defaultRect
) {
  options = merge(defaultRect, options)

  if (shouldSinglePass(options)) {
    rectCombined(ctx, rectangle, options)
  } else {
    if (shouldDrawFill(options)) {
      transparency(ctx, () => rectFill(ctx, rectangle, options), options.fill.opacity)
    }

    if (shouldDrawOutline(options)) {
      transparency(ctx, () => rectOutline(ctx, rectangle, options), options.line.opacity)
    }
  }
}

export function line(
  ctx: CanvasRenderingContext2D,
  from: Point,
  to: Point,
  options: LineOptions = defaultLine
) {
  options = merge(defaultLine, options)
  if (shouldDrawLine(options)) {
    transparency(ctx, () => {
      ctx.strokeStyle = options.colour
      ctx.lineWidth = options.width
      ctx.beginPath()
      ctx.moveTo(from.x, from.y)
      ctx.lineTo(to.x, to.y)
      ctx.stroke()
      ctx.closePath()
    }, options.opacity)
  }
}

export function bezier(
  ctx: CanvasRenderingContext2D,
  from: Point,
  to: Point,
  cp1: Point,
  cp2: Point,
  options: LineOptions = defaultLine
) {
  options = merge(defaultLine, options)
  if (shouldDrawLine(options)) {
    transparency(ctx, () => {
      ctx.strokeStyle = options.colour
      ctx.lineWidth = options.width
      ctx.beginPath()
      ctx.moveTo(from.x, from.y)
      ctx.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, to.x, to.y)
      ctx.stroke()
      ctx.closePath()
    }, options.opacity)
  }
}

export function quadratic(
  ctx: CanvasRenderingContext2D,
  from: Point,
  to: Point,
  cp: Point,
  options: LineOptions = defaultLine
) {
  options = merge(defaultLine, options)
  if(shouldDrawLine(options)) {
    transparency(ctx, () => {
      ctx.strokeStyle = options.colour
      ctx.lineWidth = options.width
      ctx.beginPath()
      ctx.moveTo(from.x, from.y)
      ctx.quadraticCurveTo(cp.x, cp.y, to.x, to.y)
      ctx.stroke()
      ctx.closePath()
    });
  }
}

export function curve(
  ctx: CanvasRenderingContext2D,
  from: Point,
  to: Point,
  controlPoints: { cp1?: Point, cp2?: Point },
  options: LineOptions = defaultLine
) {
  if (controlPoints.cp1 && controlPoints.cp2) {
    bezier(ctx, from, to, controlPoints.cp1, controlPoints.cp2, options)
  } else if (controlPoints.cp1 && !controlPoints.cp2) {
    quadratic(ctx, from, to, controlPoints.cp1, options)
  } else {
    line(ctx, from, to, options)
  }
}

function circleOutline(  ctx: CanvasRenderingContext2D,
  position: Point,
  radius: number,
  options: CircleOptions
)
{
  ctx.strokeStyle = options.line.colour
  ctx.lineWidth = options.line.width
  ctx.beginPath()
  ctx.arc(position.x, position.y, radius, 0, 2 * Math.PI)
  ctx.closePath()
  ctx.stroke()
}

function circleFill(  ctx: CanvasRenderingContext2D,
  position: Point,
  radius: number,
  options: CircleOptions
)
{
  ctx.fillStyle = options.fill.colour
  ctx.beginPath()
  ctx.arc(position.x, position.y, radius, 0, 2 * Math.PI)
  ctx.closePath()
  ctx.fill()
}

function circleCombined(ctx: CanvasRenderingContext2D, position: Point, radius: number, options: CircleOptions) {
  ctx.fillStyle = options.fill.colour
  ctx.strokeStyle = options.line.colour
  ctx.lineWidth = options.line.width
  ctx.beginPath()
  ctx.arc(position.x, position.y, radius, 0, 2 * Math.PI)
  ctx.closePath()
  ctx.fill()
  ctx.stroke()
}

export function circle(
  ctx: CanvasRenderingContext2D,
  position: Point,
  radius: number,
  options: CircleOptions = defaultCircle
) {
  options = merge(defaultCircle, options)

  if (shouldSinglePass(options)) {
    circleCombined(ctx, position, radius, options)
  } else {
    if (shouldDrawFill(options)) {
      transparency(ctx, () => circleFill(ctx, position, radius, options), options.fill.opacity)
    }

    if (shouldDrawOutline(options)) {
      transparency(ctx, () => circleOutline(ctx, position, radius, options), options.line.opacity)
    }
  }
}

export function path(ctx: CanvasRenderingContext2D, operations: () => void, options = defaultLine) {
  options = merge(defaultLine, options)
  if (shouldDrawLine(options)) {
    transparency(ctx, () => {
      ctx.globalAlpha = options.opacity
      ctx.strokeStyle = options.colour
      ctx.lineWidth = options.width
      ctx.beginPath()
      operations()
      ctx.stroke()
    }, options.opacity)
  }
}
