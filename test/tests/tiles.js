// testing that drawing tile maps with the auto tiler works
;(function start() {
  const game = Bramble.game.create()
  const container = createAndAttachToContainer(
    'Tiles',
    'Draw an auto-tiling tile map in a staircase pattern',
    game.canvas
  )

  let t = null

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
