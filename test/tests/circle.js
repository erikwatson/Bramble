// testing that drawing circles works
;(function start() {
  const game = Bramble.game.create()
  const container = createAndAttachToContainer(
    'Circle',
    'Draw a single Cirlce',
    game.canvas
  )

  game.setSize(100, 100)
  game.setUpdate(dt => {})
  game.setRender(gfx => {
    gfx.circle({ x: 50, y: 50 }, 25)
  })
  game.start()
})()
