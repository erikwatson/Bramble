import { Point, TransformOptions } from "../types";
import number from "../utils/number";
import { merge } from "../utils/object";
import { freshContext } from "./common";
import { defaultTransform } from "./defaults";

export function rotation(ctx: CanvasRenderingContext2D, drawingOperations: () => void, rotation: number, around: Point) {
  freshContext(ctx, () => {
    ctx.translate(around.x, around.y);
    ctx.rotate(number.toRadians(rotation))
    ctx.translate(-around.x, -around.y);
    drawingOperations();
  })
}

export function scale(ctx: CanvasRenderingContext2D, drawingOperations: () => void, factor: number | Point, around: Point = { x: 0, y: 0 }) {
  freshContext(ctx, () => {
    ctx.translate(around.x, around.y)
    if (typeof factor === 'number') ctx.scale(factor, factor)
    else ctx.scale(factor.x, factor.y)
    ctx.translate(-around.x, -around.y)
    drawingOperations()
  })
}

export function transform(ctx: CanvasRenderingContext2D, drawingOperations: () => void, options: TransformOptions = defaultTransform) {
  options = merge(defaultTransform, options)
  scale(ctx, () => {
    rotation(ctx, drawingOperations, options.rotation, options.around)
  }, options.scale, options.around)
}
