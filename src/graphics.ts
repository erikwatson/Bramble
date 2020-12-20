import number from './utils/number'
import {
  CircleOptions,
  DropShadowOptions,
  Graphics,
  Grid,
  LineOptions,
  Point,
  RectangleOptions,
  Sprite,
  SpriteSheet,
  Terrain
} from './types'

function clear(ctx: CanvasRenderingContext2D, colour: string) {
  rect(ctx, 0, 0, ctx.canvas.width, ctx.canvas.height, {
    fill: {
      colour
    }
  })
}

function square(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  options: RectangleOptions = defaultRect
) {
  rect(ctx, x, y, size, size, options)
}

const defaultRect: RectangleOptions = {
  fill: {
    colour: '#ffffff',
    opacity: 1
  },
  line: {
    width: 2,
    colour: '#000000',
    opacity: 1
  }
}

function rect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  options: RectangleOptions = defaultRect
) {
  if (typeof options.fill !== 'undefined') {
    ctx.fillStyle = options.fill.colour
    ctx.fillRect(x, y, w, h)
  }

  if (typeof options.line !== 'undefined') {
    ctx.strokeStyle = options.line.colour
    ctx.lineWidth = options.line.width
    ctx.strokeRect(x, y, w, h)
  }
}

const defaultLine: LineOptions = {
  width: 2,
  colour: '#000000'
}

function line(
  ctx: CanvasRenderingContext2D,
  from: Point,
  to: Point,
  options: LineOptions = defaultLine
) {
  ctx.strokeStyle = options.colour
  ctx.lineWidth = options.width

  ctx.beginPath()
  ctx.moveTo(from.x, from.y)
  ctx.lineTo(to.x, to.y)
  ctx.stroke()
}

const defaultCircle: CircleOptions = {
  fill: {
    colour: '#000000',
    opacity: 1
  },

  line: {
    colour: '#ffffff',
    opacity: 1,
    width: 2
  }
}

function circle(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  options: CircleOptions = defaultCircle
) {
  // not happy with this really, make another function i think
  if (typeof options.fill !== 'undefined') {
    ctx.fillStyle = options.fill.colour
  }

  ctx.beginPath()
  ctx.strokeStyle = options.line.colour
  ctx.lineWidth = options.line.width
  ctx.arc(x, y, radius, 0, 2 * Math.PI)
  ctx.closePath()

  if (typeof options.fill !== 'undefined') {
    ctx.fill()
  }

  ctx.stroke()
}

function image(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  image: CanvasImageSource
) {
  ctx.drawImage(image, x, y, w, h)
}

function subImage(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  sx: number,
  sy: number,
  sw: number,
  sh: number,
  image: CanvasImageSource
) {
  ctx.drawImage(image, sx, sy, sw, sh, x, y, w, h)
}

function sprite(ctx: CanvasRenderingContext2D, sprite: Sprite) {
  const halfWidth = sprite.width / 2
  const halfHeight = sprite.height / 2

  ctx.save()
  ctx.translate(sprite.x + halfWidth, sprite.y + halfHeight)
  ctx.rotate(number.toRadians(sprite.rotation))

  if (sprite.frames.length > 1) {
    subImage(
      ctx,
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
    image(
      ctx,
      -halfWidth,
      -halfHeight,
      sprite.width,
      sprite.height,
      sprite.texture
    )
  }

  ctx.restore()
}

function txt(
  ctx: CanvasRenderingContext2D,
  x: number = 0,
  y: number = 0,
  text: string = '',
  colour: string = '#000000',
  font: string = '16pt sans-serif'
) {
  ctx.fillStyle = colour
  ctx.font = font
  ctx.textAlign = 'left'
  ctx.textBaseline = 'top'
  ctx.fillText(text, x, y)
}

function tile(
  ctx: CanvasRenderingContext2D,
  positionX: number,
  positionY: number,
  tilesheet: CanvasImageSource,
  gridX: number,
  gridY: number,
  tileSheetX: number,
  tileSheetY: number,
  scale: number,
  tileWidth: number,
  tileHeight: number
) {
  subImage(
    ctx,
    positionX + scale * (gridX * tileWidth),
    positionY + scale * (gridY * tileHeight),
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
function tiles(
  ctx: CanvasRenderingContext2D,
  position: Point,
  tileGrid: number[][],
  spriteSheets: Terrain[],
  scale: number,
  tileWidth: number,
  tileHeight: number
) {
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

      // Figure out which sheet we're supposed to be drawing from
      let sheet = spriteSheets.filter(sheet => {
        return sheet.type === tileGrid[y][x]
      })[0]

      if (!sheet) {
        console.error(`Sheet ${tileGrid[y][x]} not found!`)
        return
      }

      const selections = sheet.tiles.filter(x => x.type === sum)

      // Note: Just picking a random one of the variants every time we render for now
      const selection =
        selections[Math.floor(Math.random() * selections.length)]

      if (selection) {
        tile(
          ctx,
          position.x,
          position.y,
          sheet.image,
          x,
          y,
          selection.position.x,
          selection.position.y,
          scale,
          selection.size.width,
          selection.size.height
        )
      } else {
        console.log(`Tile not defined ${sum}`)
      }
    }
  }
}

const defaultDropShadow = {
  shadowcolour: '#000000',
  shadowBlur: 6,
  shadowOffsetX: 4,
  shadowOffsetY: 4
}

function shadow(
  ctx: CanvasRenderingContext2D,
  drawingOperations: () => void,
  options: DropShadowOptions = defaultDropShadow
) {
  ctx.save()

  ctx.shadowColor = options.shadowcolour
  ctx.shadowBlur = options.shadowBlur
  ctx.shadowOffsetX = options.shadowOffsetX
  ctx.shadowOffsetY = options.shadowOffsetY

  drawingOperations()
  ctx.restore()
}

function dodge(ctx: CanvasRenderingContext2D, drawingOperations: () => void) {
  ctx.save()
  ctx.globalCompositeOperation = 'colour-dodge'
  drawingOperations()
  ctx.restore()
}

function overlay(ctx: CanvasRenderingContext2D, drawingOperations: () => void) {
  ctx.save()
  ctx.globalCompositeOperation = 'overlay'
  drawingOperations()
  ctx.restore()
}

function transparency(
  ctx: CanvasRenderingContext2D,
  drawingOperations: () => void,
  alpha = 0.25
) {
  ctx.save()
  ctx.globalAlpha = alpha
  drawingOperations()
  ctx.restore()
}

function create(ctx: CanvasRenderingContext2D): Graphics {
  return {
    circle: (x, y, radius, options = defaultCircle) => {
      circle(ctx, x, y, radius, options)
    },
    clear: colour => {
      clear(ctx, colour)
    },
    square: (x, y, size, options = defaultRect) => {
      square(ctx, x, y, size, options)
    },
    rect: (x, y, w, h, options = defaultRect) => {
      rect(ctx, x, y, w, h, options)
    },
    image: (x, y, w, h, img) => {
      image(ctx, x, y, w, h, img)
    },
    line: (from, to, options = defaultLine) => {
      line(ctx, from, to, options)
    },
    sprite: spr => {
      sprite(ctx, spr)
    },
    subImage: (x, y, w, h, sx, sy, sw, sh, img) => {
      subImage(ctx, x, y, w, h, sx, sy, sw, sh, img)
    },
    text: (
      x = 0,
      y = 0,
      text = '',
      colour = '#000000',
      font = '16pt sans-serif'
    ) => {
      txt(ctx, x, y, text, colour, font)
    },
    tiles: (position, tileGrid, spriteSheets, scale, tileWidth, tileHeight) => {
      tiles(ctx, position, tileGrid, spriteSheets, scale, tileWidth, tileHeight)
    },
    shadow: (drawingOperations, options = defaultDropShadow) => {
      shadow(ctx, drawingOperations, options)
    },
    dodge: drawingOperations => {
      dodge(ctx, drawingOperations)
    },
    overlay: drawingOperations => {
      overlay(ctx, drawingOperations)
    },
    transparency: (drawingOperations, alpha = 0.25) => {
      transparency(ctx, drawingOperations, alpha)
    }
  }
}

export default {
  create,
  circle,
  clear,
  image,
  line,
  rect,
  sprite,
  square,
  subImage,
  text: txt,
  tiles,
  shadow,
  dodge,
  overlay,
  transparency
}
