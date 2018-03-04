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

export default {
  loadText,
  loadJson
}
