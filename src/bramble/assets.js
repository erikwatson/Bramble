function load (path) {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest()

    request.responseType = "text"

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

export default {
  load
}
