;(function start() {
  const game = Bramble.game.create()
  const container = createAndAttachToContainer(
    'Clear',
    'Make sure that clearing the screen works properly, should just be black',
    game.canvas
  )

  game.setSize(100, 100)
  game.setUpdate(dt => {})
  game.setRender(gfx => {
    gfx.circle({ x: 50, y: 50 }, 25)
    gfx.clear()
  })
  game.start()
})()
