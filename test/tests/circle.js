// testing that drawing circles works
;(function start() {
  test('default circle', 'draw a default circle', gfx => {
    gfx.circle({ x: 50, y: 50 }, 25)
  })
})()
