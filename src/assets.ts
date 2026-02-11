import { AssetManager, AssetStore, AssetType, Terrain, Tile } from "./types"

export function loadText(path: string): Promise<string> {
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
  return Promise.all(paths.map(x => loadText(x)))
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

  return loadText(path)
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

export function loadSound(path: string): Promise<ArrayBuffer> {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest()

    request.responseType = 'arraybuffer'

    request.addEventListener('load', _ => {
      resolve(request.response)
    })

    request.addEventListener('error', event => {
      reject(event)
    })

    request.open('GET', path)
    request.send()
  })
}

export function loadAllSounds(paths: string[] = []): Promise<ArrayBuffer[]> {
  return Promise.all(paths.map(x => loadSound(x)))
}

function create(ctx: AudioContext): AssetManager {
  const store = {
    images: new Map<string, HTMLImageElement>(),
    sounds: new Map<string, AudioBuffer>(),
    data: new Map<string, string>(),
  }

  const add = async (label: string, type: AssetType, path: string) => {
    switch(type) {
      case 'image': {
        const img = await loadImage(path)
        store.images.set(label, img)
        break
      }
     case 'sound': {
        const arrayBuffer = await loadSound(path)
        const audioBuffer = await ctx.decodeAudioData(arrayBuffer)
        store.sounds.set(label, audioBuffer)
        break
      }
      default: {
        const dta = await loadText(path)
        store.data.set(label, dta)
      }
    }
  }

  const remove = (label: string, type: AssetType) => {
    switch(type) {
      case 'image': store.images.delete(label); break
      case 'sound': store.sounds.delete(label); break
      default: store.data.delete(label)
    }
  }

  return { add, remove, assets: store }
}

export default { create }
