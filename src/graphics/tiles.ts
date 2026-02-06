import { Point, Size, Terrain } from "../types"
import { subImage } from "./images"

export function tile(
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
export function tiles(
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
        console.error(`Tile not defined ${sum}`)
      }
    }
  }
}
