;(function start() {
  gameTest('clear', 'should just show black', gfx => {
    gfx.circle({ x: 50, y: 50 }, 25)
    gfx.clear()
  })
})()
