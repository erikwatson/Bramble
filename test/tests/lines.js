// testing that the line drawing works
;(function start() {
  gameTest('lines', 'should draw an x', gfx => {
    gfx.line({ x: 25, y: 25 }, { x: 75, y: 75 })
    gfx.line({ x: 75, y: 25 }, { x: 25, y: 75 })
  })
})()
