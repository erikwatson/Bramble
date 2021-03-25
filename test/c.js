// testing that gfx.circle works
;(function start() {
  const container = document.querySelector('#c')
  const game = Bramble.game.create()

  game.attachTo(container)
  game.setSize(100, 100)
  game.setUpdate(dt => {})
  game.setRender(gfx => {
    gfx.circle({ x: 50, y: 50 }, 25)
  })
  game.start()
})()
