;(function start() {
  gameTest('Clear Rectangle to Colour', 'should display half a circle', gfx => {
    gfx.circle({ x: 50, y: 50 }, 25)
    gfx.clearRect({ x: 0, y: 0, width: 50, height: 100 }, 'red')
  })
})()
