import { TextOptions, Point } from "../types"
import { merge } from "../utils/object"
import { freshContext } from "./common"
import { defaultText } from "./defaults"

export function txt(
  ctx: CanvasRenderingContext2D,
  position: Point,
  text: string = '',
  options: TextOptions = defaultText
) {
  freshContext(ctx, () => {
    options = merge(defaultText, options)
    ctx.fillStyle = options.colour
    ctx.font = `${options.size} ${options.family}`
    ctx.textAlign = options.align
    ctx.textBaseline = options.baseline
    ctx.fillText(text, position.x, position.y)
  })
}
