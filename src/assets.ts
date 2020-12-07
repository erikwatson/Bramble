import terrain, { Terrain } from './terrain'
import sound from './sound'

function load(
  path: string,
  type: XMLHttpRequestResponseType = 'text'
): Promise<string> {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest()

    request.responseType = type

    request.addEventListener('load', event => {
      switch (type) {
        case 'text':
          resolve(request.responseText)
          break

        case 'json':
          resolve(request.response)
          break

        default:
          console.error(`invalid type provided to load: ${type} is unknown`)
      }
    })

    request.addEventListener('error', event => {
      reject(event)
    })

    request.open('GET', path, true)
    request.send()
  })
}

export function loadText(path: string): Promise<string> {
  return load(path, 'text')
}

export function loadAllText(paths: string[] = []): Promise<string[]> {
  return Promise.all(paths.map(x => load(x, 'text')))
}

export function loadJson(path: string): Promise<string> {
  return load(path, 'json')
}

export function loadAllJson(paths: string[] = []): Promise<string[]> {
  return Promise.all(paths.map(x => load(x, 'json')))
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
export function loadTerrain(path: string): Promise<Terrain> {
  let description = null

  return loadJson(path)
    .then(json => {
      description = json
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
