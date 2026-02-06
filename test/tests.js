// clear testing
test('clear', 'should show black', gfx => {
  gfx.circle({ x: 50, y: 50 }, 25)
  gfx.clear()
})

test('clear to a colour', 'should show red', gfx => {
  gfx.clear('red')
})

test('clear rectangle', 'should display half a circle', gfx => {
  gfx.clear()
  gfx.circle({ x: 50, y: 50 }, 25)
  gfx.clearRect({ x: 0, y: 0, width: 50, height: 100 })
})

test('clear rectangle to colour', 'should display half a circle', gfx => {
  gfx.clear()
  gfx.circle({ x: 50, y: 50 }, 25)
  gfx.clearRect({ x: 0, y: 0, width: 50, height: 100 }, 'red')
})
