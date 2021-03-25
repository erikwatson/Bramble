// testing that drawing circles works
;(function start() {
  const container = document.querySelector('#d')
  const game = Bramble.game.create()

  game.attachTo(container)
  game.setSize(100, 100)
  game.setUpdate(dt => {})
  game.setRender(gfx => {
    gfx.rect(10, 50, 80, 10)
  })
  game.start()
})()
