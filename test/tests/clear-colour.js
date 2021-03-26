;(function start() {
  const game = Bramble.game.create()
  const container = createAndAttachToContainer(
    'Clear to a Colour',
    'gfx.clear can take a colour, this should show red',
    game.canvas
  )

  game.setSize(100, 100)
  game.setUpdate(dt => {})
  game.setRender(gfx => {
    // make a mess
    gfx.circle({ x: 50, y: 50 }, 25)

    // clear it
    gfx.clear('red')
  })
  game.start()
})()
