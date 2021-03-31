import { Terrain, Tile } from './types'

export function loadString(path: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest()

    request.addEventListener('load', _ => {
      resolve(request.responseText)
    })

    request.addEventListener('error', event => {
      reject(event)
    })

    request.open('GET', path)
    request.send()
  })
}

export function loadAllText(paths: string[] = []) {
  return Promise.all(paths.map(x => loadString(x)))
}

export function loadImage(path: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()

    img.addEventListener('load', _ => {
      resolve(img)
    })

    img.addEventListener('error', err => {
      reject(err)
    })

    img.src = path
  })
}

export function loadAllImages(
  paths: string[] = []
): Promise<HTMLImageElement[]> {
  return Promise.all(paths.map(x => loadImage(x)))
}

interface Description {
  path: string
  name: string
  type: number
  tiles: Tile[]
}

// Downloads a Terrain file,
// reads it,
// downloads the related image file,
// returns a new Terrain object
export function loadTerrain(path: string): Promise<Terrain> {
  let description: Description

  return loadString(path)
    .then(json => {
      description = JSON.parse(json)
      return loadImage(description.path)
    })
    .then(image => ({
      name: description.name,
      type: description.type,
      image: image,
      tiles: description.tiles
    }))
}

export function loadAllTerrain(paths: string[] = []): Promise<Terrain[]> {
  return Promise.all(paths.map(x => loadTerrain(x)))
}

export default {
  loadImage,
  loadString,
  loadAllText,
  loadAllImages,
  loadTerrain,
  loadAllTerrain
}
