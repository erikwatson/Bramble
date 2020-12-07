function make2DArray(
  width: number = 1,
  height: number = 1,
  defaultValue: any = null
) {
  let result = []

  for (let y = 0; y < height; y++) {
    let row = []

    for (let x = 0; x < width; x++) {
      row.push(defaultValue)
    }

    result.push(row)
  }

  return result
}

function copyTiles(tiles) {
  return tiles.map(arr => arr.slice())
}

interface Position {
  x: number
  y: number
}

export interface Grid {
  pos: Position
  visible: boolean
  divisions: number
  tileWidth: number
  tileHeight: number
  tiles: number[][]
  width: number
  height: number
  tileSize: number
  scale: number
}

const defaultGrid = {
  pos: { x: 0, y: 0 },
  visible: true,
  divisions: 4,
  tileWidth: 8,
  tileHeight: 8,
  scale: 1
}

function fill(tiles, position: Position, target, replacement) {
  let gridClone = copyTiles(tiles)

  function floodFill(position: Position, target, replacement) {
    if (target === replacement) {
      return
    }

    const valueAtPosition = gridClone[position.y][position.x]

    if (valueAtPosition !== target) {
      return
    }

    const isWithinBounds =
      position.x < gridClone[position.y].length &&
      position.x >= 0 &&
      position.y < gridClone.length &&
      position.y >= 0

    if (isWithinBounds) {
      gridClone[position.y][position.x] = replacement

      if (position.y < gridClone.length - 1) {
        floodFill({ x: position.x, y: position.y + 1 }, target, replacement)
      }

      if (position.y > 0) {
        floodFill({ x: position.x, y: position.y - 1 }, target, replacement)
      }

      if (position.x < gridClone[0].length - 1) {
        floodFill({ x: position.x + 1, y: position.y }, target, replacement)
      }

      if (position.x > 0) {
        floodFill({ x: position.x - 1, y: position.y }, target, replacement)
      }
    }

    return
  }

  if (true) {
    floodFill(position, target, replacement)
  }

  return gridClone
}

interface GridOptions {
  pos: Position
  visible: boolean
  divisions: number
  tileWidth: number
  tileHeight: number
  scale: number
}

function create(
  width: number,
  height: number,
  options: GridOptions = defaultGrid
): Grid {
  options = { ...defaultGrid, ...options }

  let tiles = make2DArray(width, height, 0)
  let pos = { x: options.pos.x, y: options.pos.y }
  let visible = options.visible
  let divisions = options.divisions
  let tileWidth = options.tileWidth
  let tileHeight = options.tileHeight
  let tileSize = options.tileWidth
  let scale = options.scale

  return {
    divisions,
    pos,
    tileHeight,
    tiles,
    tileWidth,
    visible,
    width,
    height,
    tileSize,
    scale
  }
}

export default {
  create,
  fill,
  copyTiles
}
