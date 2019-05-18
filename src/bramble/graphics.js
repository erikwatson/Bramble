import number from './number'

let ctx = null

function setContext(context) {
  ctx = context
}

function clear(color) {
  rect(0, 0, ctx.canvas.width, ctx.canvas.height, {
    fill: {
      color
    }
  })
}

const defaultRect = {
  fill: {
    color: '#ffffff',
    opacity: 1
  },
  line: {
    width: 2,
    color: '#000000',
    opacity: 1
  }
}

function square(x, y, size, options = defaultRect) {
  rect(x, y, size, size, options)
}

function rect(x, y, w, h, options = defaultRect) {
  if (typeof options.fill !== 'undefined') {
    ctx.fillStyle = options.fill.color
    ctx.fillRect(x, y, w, h)
  }

  if (typeof options.line !== 'undefined') {
    ctx.strokeStyle = options.line.color
    ctx.lineWidth = options.line.width
    ctx.strokeRect(x, y, w, h)
  }
}

const defaultLine = {
  width: 2,
  color: '#000000'
}

function line(from, to, options = defaultLine) {
  ctx.strokeStyle = options.color
  ctx.lineWidth = options.width

  ctx.beginPath()
  ctx.moveTo(from.x, from.y)
  ctx.lineTo(to.x, to.y)
  ctx.stroke()
}

const defaultCircle = {
  fill: {
    color: '#000000',
    opacity: 1
  },

  line: {
    color: '#ffffff',
    opacity: 1,
    width: 2
  }
}

function circle(x, y, radius, options = defaultCircle) {
  // not happy with this really, make another function i think
  if (typeof options.fill !== 'undefined') {
    ctx.fillStyle = options.fill.color
  }

  ctx.beginPath()
  ctx.strokeStyle = options.line.color
  ctx.lineWidth = options.line.width
  ctx.arc(x, y, radius, 0, 2 * Math.PI)
  ctx.closePath()

  if (typeof options.fill !== 'undefined') {
    ctx.fill()
  }

  ctx.stroke()
}

function image(x, y, w, h, image) {
  ctx.drawImage(image, x, y, w, h)
}

function subImage(x, y, w, h, sx, sy, sw, sh, image) {
  ctx.drawImage(image, sx, sy, sw, sh, x, y, w, h)
}

function sprite(sprite) {
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

function text(
  x = 0,
  y = 0,
  text = '',
  color = '#000000',
  font = '16pt sans-serif'
) {
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
function textbox(textbox) {
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

function tile(
  tilesheet,
  gridX,
  gridY,
  tileSheetX,
  tileSheetY,
  scale,
  tileWidth,
  tileHeight
) {
  subImage(
    scale * (gridX * tileWidth),
    scale * (gridY * tileHeight),
    scale * tileWidth,
    scale * tileHeight,
    tileWidth * tileSheetX,
    tileHeight * tileSheetY,
    tileWidth,
    tileHeight,
    tilesheet
  )
}

// tilegrid: a 2d array of numbers representing terrain types
// spritesheets: An object, each key is the value that represents a tile from this sheet
function tiles(tileGrid, spriteSheets, scale, tileWidth, tileHeight) {
  const dirValues = {
    NW: 1,
    N: 2,
    NE: 4,
    E: 8,
    SE: 16,
    S: 32,
    SW: 64,
    W: 128
  }

  for (let y = 0; y < tileGrid.length; y++) {
    for (let x = 0; x < tileGrid[y].length; x++) {
      if (tileGrid[y][x] === 0) {
        continue
      }

      // REAL VALUES
      const tl = y > 0 ? tileGrid[y - 1][x - 1] : 0
      const tm = y > 0 ? tileGrid[y - 1][x] : 0
      const tr = y > 0 ? tileGrid[y - 1][x + 1] : 0

      const ml = tileGrid[y][x - 1]
      const m = tileGrid[y][x]
      const mr = tileGrid[y][x + 1]

      const bl = y < tileGrid.length - 1 ? tileGrid[y + 1][x - 1] : 0
      const bm = y < tileGrid.length - 1 ? tileGrid[y + 1][x] : 0
      const br = y < tileGrid.length - 1 ? tileGrid[y + 1][x + 1] : 0

      // BINARY VALUES
      const n = m === tm ? 1 : 0
      const e = m === mr ? 1 : 0
      const s = m === bm ? 1 : 0
      const w = m === ml ? 1 : 0

      const nw = m === tm && m === ml ? (m === tl ? 1 : 0) : 0

      const ne = m === tm && m === mr ? (m === tr ? 1 : 0) : 0

      const sw = m === bm && m === ml ? (m === bl ? 1 : 0) : 0

      const se = m === bm && m === mr ? (m === br ? 1 : 0) : 0

      const sum =
        dirValues.NW * nw +
        dirValues.N * n +
        dirValues.NE * ne +
        dirValues.E * e +
        dirValues.SE * se +
        dirValues.S * s +
        dirValues.SW * sw +
        dirValues.W * w

      let sheet = null

      Object.keys(spriteSheets).forEach(key => {
        if (String(tileGrid[y][x]) === key) {
          sheet = spriteSheets[key]
        }
      })

      if (sheet === null) {
        // Force the "first" sheet as the default for the moment
        // We should probably handle this a little differently
        sheet = spriteSheets[Object.keys(spriteSheets)[0]]
      }

      // NOTE: Do not be tempted to reorganise these by case.
      //       Notice the X and Y values increment nicely, making it easier to see blank spots
      switch (sum) {
        case 0:
          tile(sheet, x, y, 0, 0, scale, tileWidth, tileHeight)
          break

        case 2:
          tile(sheet, x, y, 1, 0, scale, tileWidth, tileHeight)
          break

        case 8:
          tile(sheet, x, y, 2, 0, scale, tileWidth, tileHeight)
          break

        case 32:
          tile(sheet, x, y, 3, 0, scale, tileWidth, tileHeight)
          break

        case 128:
          tile(sheet, x, y, 4, 0, scale, tileWidth, tileHeight)
          break

        case 34:
          tile(sheet, x, y, 0, 1, scale, tileWidth, tileHeight)
          break

        case 136:
          tile(sheet, x, y, 1, 1, scale, tileWidth, tileHeight)
          break

        case 138:
          tile(sheet, x, y, 2, 1, scale, tileWidth, tileHeight)
          break

        case 42:
          tile(sheet, x, y, 3, 1, scale, tileWidth, tileHeight)
          break

        case 168:
          tile(sheet, x, y, 4, 1, scale, tileWidth, tileHeight)
          break

        case 162:
          tile(sheet, x, y, 0, 2, scale, tileWidth, tileHeight)
          break

        case 170:
          tile(sheet, x, y, 1, 2, scale, tileWidth, tileHeight)
          break

        case 187:
          tile(sheet, x, y, 2, 2, scale, tileWidth, tileHeight)
          break

        case 238:
          tile(sheet, x, y, 3, 2, scale, tileWidth, tileHeight)
          break

        case 131:
          tile(sheet, x, y, 4, 2, scale, tileWidth, tileHeight)
          break

        case 14:
          tile(sheet, x, y, 0, 3, scale, tileWidth, tileHeight)
          break

        case 56:
          tile(sheet, x, y, 1, 3, scale, tileWidth, tileHeight)
          break

        case 224:
          tile(sheet, x, y, 2, 3, scale, tileWidth, tileHeight)
          break

        case 130:
          tile(sheet, x, y, 3, 3, scale, tileWidth, tileHeight)
          break

        case 10:
          tile(sheet, x, y, 4, 3, scale, tileWidth, tileHeight)
          break

        case 40:
          tile(sheet, x, y, 0, 4, scale, tileWidth, tileHeight)
          break

        case 160:
          tile(sheet, x, y, 1, 4, scale, tileWidth, tileHeight)
          break

        case 234:
          tile(sheet, x, y, 2, 4, scale, tileWidth, tileHeight)
          break

        case 171:
          tile(sheet, x, y, 3, 4, scale, tileWidth, tileHeight)
          break

        case 174:
          tile(sheet, x, y, 4, 4, scale, tileWidth, tileHeight)
          break

        case 186:
          tile(sheet, x, y, 0, 5, scale, tileWidth, tileHeight)
          break

        case 143:
          tile(sheet, x, y, 1, 5, scale, tileWidth, tileHeight)
          break

        case 62:
          tile(sheet, x, y, 2, 5, scale, tileWidth, tileHeight)
          break

        case 248:
          tile(sheet, x, y, 3, 5, scale, tileWidth, tileHeight)
          break

        case 227:
          tile(sheet, x, y, 4, 5, scale, tileWidth, tileHeight)
          break

        case 142:
          tile(sheet, x, y, 0, 6, scale, tileWidth, tileHeight)
          break

        case 58:
          tile(sheet, x, y, 1, 6, scale, tileWidth, tileHeight)
          break

        case 232:
          tile(sheet, x, y, 2, 6, scale, tileWidth, tileHeight)
          break

        case 163:
          tile(sheet, x, y, 3, 6, scale, tileWidth, tileHeight)
          break

        case 226:
          tile(sheet, x, y, 4, 6, scale, tileWidth, tileHeight)
          break

        case 139:
          tile(sheet, x, y, 0, 7, scale, tileWidth, tileHeight)
          break

        case 46:
          tile(sheet, x, y, 1, 7, scale, tileWidth, tileHeight)
          break

        case 184:
          tile(sheet, x, y, 2, 7, scale, tileWidth, tileHeight)
          break

        case 250:
          tile(sheet, x, y, 3, 7, scale, tileWidth, tileHeight)
          break

        case 235:
          tile(sheet, x, y, 4, 7, scale, tileWidth, tileHeight)
          break

        case 175:
          tile(sheet, x, y, 0, 8, scale, tileWidth, tileHeight)
          break

        case 190:
          tile(sheet, x, y, 1, 8, scale, tileWidth, tileHeight)
          break

        case 254:
          tile(sheet, x, y, 2, 8, scale, tileWidth, tileHeight)
          break

        case 251:
          tile(sheet, x, y, 3, 8, scale, tileWidth, tileHeight)
          break

        case 239:
          tile(sheet, x, y, 4, 8, scale, tileWidth, tileHeight)
          break

        case 191:
          tile(sheet, x, y, 0, 9, scale, tileWidth, tileHeight)
          break

        case 255:
          tile(sheet, x, y, 1, 9, scale, tileWidth, tileHeight)
          break

        default:
          console.log(`Tile not defined ${sum}`)
      }
    }
  }
}

export default {
  circle,
  clear,
  image,
  line,
  rect,
  setContext,
  sprite,
  square,
  subImage,
  text,
  textbox,
  tiles
}
