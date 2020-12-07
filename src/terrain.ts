interface Terrain {
  name: string
  type: number
  image
  tiles
}

function create(name: string, type: number, image, tiles): Terrain {
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
