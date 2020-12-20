;(function start() {
  const container = document.querySelector('#e')
  const game = Bramble.game.create()

  let t = null

  game.attachTo(container)
  game.setSize(100, 100)
  game.setSmoothing(false)
  game.setUpdate(dt => {})
  game.setRender(gfx => {
    gfx.tiles(
      { x: 0, y: 0 },
      [
        [0, 0, 0, 0, 0, 0],
        [0, 1, 0, 0, 1, 0],
        [0, 1, 1, 0, 0, 0],
        [0, 1, 1, 1, 0, 0],
        [0, 1, 1, 1, 1, 0],
        [0, 0, 0, 0, 0, 0]
      ],
      [t],
      2,
      8,
      8
    )
  })

  Bramble.assets.loadTerrain('./terrain/default.json').then(terrain => {
    t = terrain
    game.start()
  })
})()
