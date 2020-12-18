import { Terrain } from './types'
import terrain from './terrain'
import sound from './sound'

export function loadText(path: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest()

    request.responseType = 'text'

    request.addEventListener('load', event => {
      resolve(request.responseText)
    })

    request.addEventListener('error', event => {
      reject(event)
    })

    request.open('GET', path, true)
    request.send()
  })
}

export function loadAllText(paths: string[] = []): Promise<string[]> {
  return Promise.all(paths.map(x => loadText(x)))
}

interface DynamicObject {
  [key: string]: any
}

export function loadJson(path: string): Promise<DynamicObject> {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest()

    request.responseType = 'text'

    request.addEventListener('load', event => {
      resolve(request.response)
    })

    request.addEventListener('error', event => {
      reject(event)
    })

    request.open('GET', path, true)
    request.send()
  })
}

export function loadAllJson(paths: string[] = []): Promise<DynamicObject> {
  return Promise.all(paths.map(x => loadJson(x)))
}

export function loadImage(path: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()

    img.addEventListener('load', e => {
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

export function loadSound(path: string) {
  return new Promise((resolve, reject) => {
    window
      .fetch(path)
      .then(response => response.arrayBuffer())
      .then(arrayBuffer => sound.decode(arrayBuffer))
      .then(decoded => resolve(decoded))
      .catch(err => reject(err))
  })
}

export function loadAllSounds(paths: string[] = []) {
  return Promise.all(paths.map(x => loadSound(x)))
}

// TODO: I am not sure yet if/how these are meaningfully different to loadSound
export function loadMusic(path: string) {
  return new Promise((resolve, reject) => {})
}

export function loadAllMusic(paths: string[] = []) {
  return Promise.all(paths.map(x => loadMusic(x)))
}

// Downloads a Terrain file,
// reads it,
// downloads the related image file,
// returns a new Terrain object
interface Description {
  name
  type
  image
  tiles
  path
}

export function loadTerrain(path: string): Promise<Terrain> {
  let description: Description

  return loadJson(path)
    .then(json => {
      description = json as DynamicObject
      return loadImage(description.path)
    })
    .then(image =>
      terrain.create(
        description.name,
        description.type,
        image,
        description.tiles
      )
    )
}

export function loadAllTerrain(paths: string[] = []): Promise<Terrain[]> {
  return Promise.all(paths.map(x => loadTerrain(x)))
}

export default {
  loadText,
  loadJson,
  loadImage,
  loadAllText,
  loadAllImages,
  loadSound,
  loadAllSounds,
  loadTerrain,
  loadAllTerrain
}
