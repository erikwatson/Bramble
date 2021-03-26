// testing that drawing circles works
;(function start() {
  gameTest('default circle', 'draw a default circle', gfx => {
    gfx.circle({ x: 50, y: 50 }, 25)
  })
})()
