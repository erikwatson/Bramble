// testing that drawing tile maps with the auto tiler works
;(function start() {
  Bramble.assets.loadTerrain('./terrain/default.json').then(terrain => {
    gameTest('auto tile', 'should auto tile a staircase pattern', gfx => {
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
        [terrain],
        2,
        8,
        8
      )
    })
  })
})()
