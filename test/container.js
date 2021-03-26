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
  wrapper.appendChild(container)

  return container
}
