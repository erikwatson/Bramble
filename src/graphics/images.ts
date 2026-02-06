import { Point, Size } from "../types"

export function image(
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement,
  position: Point,
  size?: Size
) {
  if (size) {
    ctx.drawImage(image, position.x, position.y, size.width, size.height)
  } else {
    ctx.drawImage(image, position.x, position.y, image.width, image.height)
  }
}

export function subImage(
  ctx: CanvasRenderingContext2D,
  image: CanvasImageSource,
  position: Point,
  size: Size,
  subPosition: Point,
  subSize: Size
) {
  ctx.drawImage(
    image,
    subPosition.x,
    subPosition.y,
    subSize.width,
    subSize.height,
    position.x,
    position.y,
    size.width,
    size.height
  )
}


