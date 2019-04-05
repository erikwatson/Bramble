function load(path, type = 'text') {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest()

    request.responseType = type

    request.addEventListener('load', event => {
      resolve(event.target.responseText)
    })

    request.addEventListener('error', event => {
      reject(event)
    })

    request.open('GET', path, true)
    request.send()
  })
}

export function loadText(path) {
  return load(path, 'text')
}

export function loadAllText(paths = []) {
  return Promise.all(paths.map(x => load(x, 'text')))
}

export function loadJson(path) {
  return load(path, 'json')
}

export function loadAllJson(paths = []) {
  return Promise.all(paths.map(x => load(x, 'json')))
}

export function loadImage(path) {
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

export function loadAllImages(paths = []) {
  return Promise.all(paths.map(x => loadImage(x)))
}

export function loadSound(path) {
  return new Promise((resolve, reject) => {
    const audio = new Audio()

    audio.addEventListener('canplaythrough', e => {
      resolve(audio)
    })

    audio.addEventListener('error', err => {
      reject(err)
    })

    audio.src = path
  })
}

export function loadAllSounds(paths = []) {
  return Promise.all(paths.map(x => loadSound(x)))
}

export default {
  loadText,
  loadJson,
  loadImage,
  loadAllText,
  loadAllImages,
  loadSound,
  loadAllSounds
}
