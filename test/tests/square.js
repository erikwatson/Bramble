// testing that gfx.square works
;(function start() {
  const game = Bramble.game.create()
  const container = createAndAttachToContainer(
    'Square',
    'Draw a single Square',
    game.canvas
  )

  game.setSize(100, 100)
  game.setUpdate(dt => {})
  game.setRender(gfx => {
    gfx.square({ x: 25, y: 25 }, 50)
  })
  game.start()
})()
