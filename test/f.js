// testing that the line drawing works
;(function start() {
  const container = document.querySelector('#f')
  const game = Bramble.game.create()

  game.attachTo(container)
  game.setSize(100, 100)
  game.setUpdate(dt => {})
  game.setRender(gfx => {
    gfx.line(
      { x: 10, y: 10 },
      { x: 90, y: 90 },
      {
        colour: 'white',
        width: 2
      }
    )

    gfx.line(
      { x: 90, y: 10 },
      { x: 10, y: 90 },
      {
        colour: 'white',
        width: 2
      }
    )
  })
  game.start()
})()
