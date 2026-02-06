export function freshContext(ctx: CanvasRenderingContext2D, callback: () => void) {
  ctx.save();
  callback();
  ctx.restore();
}
