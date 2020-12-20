;(function start() {
  const container = document.querySelector('#b')
  const game = Bramble.game.create()

  game.attachTo(container)
  game.setSize(100, 100)
  game.setUpdate(dt => {})
  game.setRender(gfx => {
    gfx.square(25, 25, 50)
  })
  game.start()
})()
