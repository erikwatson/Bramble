function load (path, type = 'text') {
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

export function loadText (path) {
  return load(path, 'text')
}

export function loadJson (path) {
  return load(path, 'json')
}

export function loadImage (path) {
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

export default {
  loadText,
  loadJson,
  loadImage
}
