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

  if (sprite.frames.length > 1) {
    subImage(
      -halfWidth,
      -halfHeight,
      sprite.width,
      sprite.height,
      sprite.frames[sprite.frame].x,
      sprite.frames[sprite.frame].y,
      sprite.frames[sprite.frame].width,
      sprite.frames[sprite.frame].height,
      sprite.texture
    )
  } else {
    image(-halfWidth, -halfHeight, sprite.width, sprite.height, sprite.texture)
  }

  ctx.restore()
}

function text (x = 0, y = 0, text = '', color = '#000000', font = '16pt sans-serif') {
  ctx.fillStyle = color
  ctx.font = font
  ctx.textAlign = 'left'
  ctx.textBaseline = 'top'
  ctx.fillText(text, x, y)
}

// TODO: Figure out word wrapping for these boxes.
//
//       I think we will probably have to split the text up into lines of
//       appropriate width, then render each one of them individually.
//
//       This could probably be cached in the object itself as long as we update
//       every time there's a change to the font, text, width or height.
function textbox (textbox) {
  ctx.fillStyle = '#ffffff'
  ctx.font = '16pt sans-serif'
  ctx.textAlign = 'left'
  ctx.textBaseline = 'top'

  const measurements = ctx.measureText(textbox.text)

  if (measurements.width > textbox.width) {
    textbox.text = textbox.text.substr(0, 10) + '\n' + textbox.text.substr(10)
  }

  ctx.fillText(textbox.text, textbox.x, textbox.y)
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
  text,
  textbox
}
