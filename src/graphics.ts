import number from './utils/number'
import { merge } from './utils/object'
import {
  CircleOptions,
  DropShadowOptions,
  Graphics,
  LineOptions,
  Point,
  Rectangle,
  RectangleOptions,
  Sprite,
  Terrain,
  Size
} from './types'

function clear(ctx: CanvasRenderingContext2D, colour: string) {
  rect(
    ctx,
    { x: 0, y: 0, width: ctx.canvas.width, height: ctx.canvas.height },
    {
      fill: { colour },
      line: { width: 0 }
    }
  )
}

function clearRect(
  ctx: CanvasRenderingContext2D,
  rectangle: Rectangle,
  colour: string
) {
  rect(ctx, rectangle, {
    fill: { colour },
    line: { width: 0 }
  })
}

function square(
  ctx: CanvasRenderingContext2D,
  position: Point,
  size: number,
  options: RectangleOptions = defaultRect
) {
  rect(
    ctx,
    { x: position.x, y: position.y, width: size, height: size },
    options
  )
}

const defaultRect: RectangleOptions = {
  fill: {
    colour: '#000000',
    opacity: 1
  },
  line: {
    width: 1,
    colour: '#FFFFFF',
    opacity: 1
  }
}

function rect(
  ctx: CanvasRenderingContext2D,
  rectangle: Rectangle,
  options: RectangleOptions = defaultRect
) {
  options = merge(defaultRect, options)

  ctx.globalAlpha = options.fill.opacity
  ctx.fillStyle = options.fill.colour
  ctx.fillRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height)
  ctx.globalAlpha = 1

  if (options.line.width !== 0) {
    ctx.globalAlpha = options.line.opacity
    ctx.strokeStyle = options.line.colour
    ctx.lineWidth = options.line.width
    ctx.strokeRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height)
    ctx.globalAlpha = 1
  }
}

const defaultLine: LineOptions = {
  width: 1,
  colour: '#FFFFFF',
  opacity: 1
}

function line(
  ctx: CanvasRenderingContext2D,
  from: Point,
  to: Point,
  options: LineOptions = defaultLine
) {
  options = merge(defaultLine, options)

  ctx.globalAlpha = options.opacity
  ctx.strokeStyle = options.colour
  ctx.lineWidth = options.width

  ctx.beginPath()
  ctx.moveTo(from.x, from.y)
  ctx.lineTo(to.x, to.y)
  ctx.stroke()
  ctx.globalAlpha = 1
  ctx.closePath()
}

function bezier(
  ctx: CanvasRenderingContext2D,
  from: Point,
  to: Point,
  cp1: Point,
  cp2: Point,
  options: LineOptions = defaultLine
) {
  options = merge(defaultLine, options)

  ctx.globalAlpha = options.opacity
  ctx.strokeStyle = options.colour
  ctx.lineWidth = options.width

  ctx.beginPath()
  ctx.moveTo(from.x, from.y)
  ctx.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, to.x, to.y)
  ctx.stroke()
  ctx.globalAlpha = 1
  ctx.closePath()
}

function quadratic(
  ctx: CanvasRenderingContext2D,
  from: Point,
  to: Point,
  cp: Point,
  options: LineOptions = defaultLine
) {
  options = merge(defaultLine, options)

  ctx.globalAlpha = options.opacity
  ctx.strokeStyle = options.colour
  ctx.lineWidth = options.width

  ctx.beginPath()
  ctx.moveTo(from.x, from.y)
  ctx.quadraticCurveTo(cp.x, cp.y, to.x, to.y)
  ctx.stroke()
  ctx.globalAlpha = 1
  ctx.closePath()
}

function curve(
  ctx: CanvasRenderingContext2D,
  from: Point,
  to: Point,
  controlPoints: { cp1?:Point, cp2?:Point },
  options: LineOptions = defaultLine
) {
  if (controlPoints.cp1 && controlPoints.cp2) {
    bezier(ctx, from, to, controlPoints.cp1, controlPoints.cp2, options)
  } else if (controlPoints.cp1 && !controlPoints.cp2) {
    quadratic(ctx, from, to, controlPoints.cp1, options)
  } else {
    line(ctx, from, to, options)
  }
}

const defaultCircle: CircleOptions = {
  fill: {
    colour: '#000000',
    opacity: 1
  },

  line: {
    colour: '#FFFFFF',
    opacity: 1,
    width: 1
  }
}

function circle(
  ctx: CanvasRenderingContext2D,
  position: Point,
  radius: number,
  options: CircleOptions = defaultCircle
) {
  options = merge(defaultCircle, options)

  ctx.globalAlpha = options.fill.opacity
  ctx.fillStyle = options.fill.colour
  ctx.beginPath()
  ctx.arc(position.x, position.y, radius, 0, 2 * Math.PI)
  ctx.closePath()
  ctx.fill()
  ctx.globalAlpha = 1

  if (options.line.width !== 0) {
    ctx.globalAlpha = options.line.opacity
    ctx.strokeStyle = options.line.colour
    ctx.lineWidth = options.line.width
    ctx.arc(position.x, position.y, radius, 0, 2 * Math.PI)
    ctx.closePath()
    ctx.stroke()
  }
}

function image(
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

function subImage(
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

function sprite(ctx: CanvasRenderingContext2D, sprite: Sprite) {
  const halfWidth = sprite.size.width / 2
  const halfHeight = sprite.size.height / 2

  ctx.save()
  ctx.translate(sprite.position.x + halfWidth, sprite.position.y + halfHeight)
  ctx.rotate(number.toRadians(sprite.rotation))

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

  ctx.restore()
}

function txt(
  ctx: CanvasRenderingContext2D,
  position: Point,
  text: string = '',
  colour: string = '#000000',
  font: string = '16pt sans-serif'
) {
  ctx.fillStyle = colour
  ctx.font = font
  ctx.textAlign = 'left'
  ctx.textBaseline = 'top'
  ctx.fillText(text, position.x, position.y)
}

function tile(
  ctx: CanvasRenderingContext2D,
  position: Point,
  tilesheet: HTMLImageElement,
  gridPosition: Point,
  tilesheetPosition: Point,
  scale: number,
  tileSize: Size
) {
  subImage(
    ctx,
    tilesheet,
    {
      x: position.x + scale * (gridPosition.x * tileSize.width),
      y: position.y + scale * (gridPosition.y * tileSize.height)
    },
    {
      width: scale * tileSize.width,
      height: scale * tileSize.height
    },
    {
      x: tileSize.width * tilesheetPosition.x,
      y: tileSize.height * tilesheetPosition.y
    },
    {
      width: tileSize.width,
      height: tileSize.height
    }
  )
}

// tilegrid: a 2d array of numbers representing terrain types
// spritesheets: An object, each key is the value that represents a tile from this sheet
function tiles(
  ctx: CanvasRenderingContext2D,
  position: Point,
  tileGrid: number[][],
  spriteSheets: Terrain[],
  scale: number
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
          position,
          sheet.image,
          { x, y },
          selection.position,
          scale,
          selection.size
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
  options = merge(defaultDropShadow, options)

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
  ctx.globalCompositeOperation = 'color-dodge'
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
    circle: (position, radius, options = defaultCircle) => {
      circle(ctx, position, radius, options)
    },
    clear: colour => {
      clear(ctx, colour)
    },
    clearRect: (rectangle, colour) => {
      clearRect(ctx, rectangle, colour)
    },
    curve: (from, to, controlPoints, options) => {
      curve(ctx, from, to, controlPoints, options)
    },
    square: (position, size, options = defaultRect) => {
      square(ctx, position, size, options)
    },
    rect: (rectangle, options = defaultRect) => {
      rect(ctx, rectangle, options)
    },
    image: (img, position, size) => {
      image(ctx, img, position, size)
    },
    line: (from, to, options = defaultLine) => {
      line(ctx, from, to, options)
    },
    sprite: spr => {
      sprite(ctx, spr)
    },
    subImage: (img, position, size, subPosition, subSize) => {
      subImage(ctx, img, position, size, subPosition, subSize)
    },
    text: (
      position = { x: 0, y: 0 },
      text = '',
      colour = '#000000',
      font = '16pt sans-serif'
    ) => {
      txt(ctx, position, text, colour, font)
    },
    tiles: (position, tileGrid, spriteSheets, scale) => {
      tiles(ctx, position, tileGrid, spriteSheets, scale)
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
  circle,
  clear,
  clearRect,
  create,
  curve,
  dodge,
  image,
  line,
  overlay,
  rect,
  shadow,
  sprite,
  square,
  subImage,
  text: txt,
  tiles,
  transparency
}
