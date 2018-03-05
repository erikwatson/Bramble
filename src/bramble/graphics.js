let ctx = null

function setContext (context) {
  ctx = context
}

function clear (color) {
  ctx.fillStyle = color
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
}

function rect (x, y, w, h, color) {
  ctx.fillStyle = color
  ctx.fillRect(x, y, w, h)
}

function circle (x, y, radius, color) {
  ctx.fillStyle = color
  ctx.beginPath()
  ctx.arc(x, y, radius, 0, 2 * Math.PI)
  ctx.closePath()
  ctx.fill()
}

function image (x, y, w, h, image) {
  ctx.drawImage(image, x, y, w, h)
}

function subImage (x, y, w, h, sx, sy, sw, sh, image) {
  ctx.drawImage(image, sx, sy, sw, sh, x, y, w, h)
}

function sprite (sprite) {
  drawImage(
    sprite.x,
    sprite.y,
    sprite.width,
    sprite.height,
    sprite.texture
  )
}

export default {
  setContext,
  clear,
  rect,
  circle,
  image,
  subImage,
  sprite
}
