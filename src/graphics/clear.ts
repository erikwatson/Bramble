import { Rectangle } from "../types"
import { rect } from "./shapes"

export function clear(ctx: CanvasRenderingContext2D, colour?: string) {
  if (!colour) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  } else {
    rect(
      ctx,
      { x: 0, y: 0, width: ctx.canvas.width, height: ctx.canvas.height },
      {
        fill: { colour },
        line: { width: 0 }
      }
    )
  }
}

export function clearRect(
  ctx: CanvasRenderingContext2D,
  rectangle: Rectangle,
  colour?: string
) {
  if (!colour) {
    ctx.clearRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height)
  } else {
    rect(ctx, rectangle, {
      fill: { colour },
      line: { width: 0 }
    })
  }
}
