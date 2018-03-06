import number from './number'

let ctx = null

function setContext (context) {
  ctx = context
}

function clear (color) {
  rect(0, 0, ctx.canvas.width, ctx.canvas.height, color)
}

function square (x, y, size, color) {
  rect(x, y, size, size, color)
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
  const halfWidth = sprite.width / 2
  const halfHeight = sprite.height / 2

  ctx.save()
  ctx.translate(sprite.x + halfWidth, sprite.y + halfHeight)
  ctx.rotate(number.toRadians(sprite.rotation))

  image(
    - sprite.width / 2,
    - sprite.height / 2,
    sprite.width,
    sprite.height,
    sprite.texture
  )

  ctx.restore()
}

function text (x = 0, y = 0, text = '', color = '#000000', font = '16pt sans-serif') {
  ctx.fillStyle = color
  ctx.font = font
  ctx.fillText(text, x, y)
}

export default {
  setContext,
  clear,
  rect,
  square,
  circle,
  image,
  subImage,
  sprite,
  text
}
