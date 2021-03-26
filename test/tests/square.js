// testing that gfx.square works
;(function start() {
  test('square', 'should draw a default square', gfx => {
    gfx.square({ x: 25, y: 25 }, 50)
  })
})()
