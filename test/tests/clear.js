;(function start() {
  test('clear', 'should just show black', gfx => {
    gfx.circle({ x: 50, y: 50 }, 25)
    gfx.clear()
  })

  test('Clear to a colour', 'this should show red', gfx => {
    gfx.clear('red')
  })

  test('Clear Rectangle', 'Should display half a circle', gfx => {
    gfx.circle({ x: 50, y: 50 }, 25)
    gfx.clearRect({ x: 0, y: 0, width: 50, height: 100 })
  })

  test('Clear Rectangle to Colour', 'should display half a circle', gfx => {
    gfx.circle({ x: 50, y: 50 }, 25)
    gfx.clearRect({ x: 0, y: 0, width: 50, height: 100 }, 'red')
  })
})()
