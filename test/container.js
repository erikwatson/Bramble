function createAndAttachToContainer(title, description, content) {
  const container = document.createElement('div')
  const titleElement = document.createElement('h2')
  const descriptionElement = document.createElement('p')
  const contentElement = document.createElement('div')

  container.className = 'test-container'
  titleElement.innerText = title
  descriptionElement.innerText = description
  contentElement.className = 'content'
  contentElement.appendChild(content)

  container.appendChild(contentElement)

  const info = document.createElement('div')

  info.appendChild(titleElement)
  info.appendChild(descriptionElement)

  container.appendChild(info)

  return container
}

function test(title, description, renderFunction, updateFunction, options) {
  console.log('Bramble', Bramble)
  const game = Bramble.game.create()
  const container = createAndAttachToContainer(title, description, game.canvas)

  game.setSize(100, 100)

  if (options && options.smoothing !== undefined) {
    game.setSmoothing(options.smoothing)
  }

  game.setRender(renderFunction)
  game.setUpdate(updateFunction)
  game.start()

  const wrapper = document.querySelector('#wrapper')
  wrapper.appendChild(container)
}
