import { Sprite } from "../types";
import { vec2 } from "../bramble";
import { freshContext } from "./common";
import { subImage, image } from "./images";

export function sprite(ctx: CanvasRenderingContext2D, sprite: Sprite) {
  freshContext(ctx, () => {
    const halfWidth = sprite.size.width / 2
    const halfHeight = sprite.size.height / 2

    ctx.translate(sprite.position.x + halfWidth, sprite.position.y + halfHeight)
    ctx.rotate(vec2.degreesToRadians(sprite.rotation))

    if (sprite.frames.length > 1) {
      subImage(
        ctx,
        sprite.texture,
        {
          x: -halfWidth,
          y: -halfHeight
        },
        {
          width: sprite.size.width,
          height: sprite.size.height
        },
        {
          x: sprite.frames[sprite.frame].position.x,
          y: sprite.frames[sprite.frame].position.y
        },
        {
          width: sprite.frames[sprite.frame].size.width,
          height: sprite.frames[sprite.frame].size.height
        }
      )
    } else {
      image(
        ctx,
        sprite.texture,
        {
          x: -halfWidth,
          y: -halfHeight
        },
        {
          width: sprite.size.width,
          height: sprite.size.height
        }
      )
    }
  });
}
