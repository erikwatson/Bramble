import { Terrain, Tile } from './types'

function create(
  name: string,
  type: number,
  image: CanvasImageSource,
  tiles: Array<Tile>
): Terrain {
  return {
    name,
    type,
    image,
    tiles
  }
}

export default {
  create
}
