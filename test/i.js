;(function start() {
  const container = document.querySelector('#i')
  const game = Bramble.game.create()

  game.attachTo(container)
  game.setSize(100, 100)
  game.setUpdate(dt => {})
  game.setRender(gfx => {})
  game.start()
})()
