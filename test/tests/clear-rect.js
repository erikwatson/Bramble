;(function start() {
  const game = Bramble.game.create()
  const container = createAndAttachToContainer(
    'Clear Rectangle',
    'Should display half a circle',
    game.canvas
  )

  game.setSize(100, 100)
  game.setUpdate(dt => {})
  game.setRender(gfx => {
    gfx.circle({ x: 50, y: 50 }, 25)
    gfx.clearRect({ x: 0, y: 0, width: 50, height: 100 })
  })
  game.start()
})()
