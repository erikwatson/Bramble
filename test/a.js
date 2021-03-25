// Testing that gfx.clear() works
;(function start() {
  const container = document.querySelector('#a')
  const game = Bramble.game.create()

  game.attachTo(container)
  game.setSize(100, 100)
  game.setUpdate(dt => {})
  game.setRender(gfx => {
    // make a mess
    gfx.circle({ x: 50, y: 50 }, 25)

    // clear it
    gfx.clear()
  })
  game.start()
})()
