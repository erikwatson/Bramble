// testing that the line drawing works
;(function start() {
  const game = Bramble.game.create()
  const container = createAndAttachToContainer(
    'Lines',
    'Draw an X with the line function',
    game.canvas
  )

  game.setSize(100, 100)
  game.setUpdate(dt => {})
  game.setRender(gfx => {
    gfx.line({ x: 25, y: 25 }, { x: 75, y: 75 })

    gfx.line({ x: 75, y: 25 }, { x: 25, y: 75 })
  })
  game.start()
})()
