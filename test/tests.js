// clear testing
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

// line testing
test('lines', 'should draw an x', gfx => {
  gfx.line({ x: 25, y: 25 }, { x: 75, y: 75 })
  gfx.line({ x: 75, y: 25 }, { x: 25, y: 75 })
})

test('line thickness', 'should draw lines at various thicknesses', gfx => {
  gfx.line({ x: 25, y: 25 }, { x: 75, y: 25 })
  gfx.line({ x: 25, y: 35 }, { x: 75, y: 35 }, { width: 2 })
  gfx.line({ x: 25, y: 45 }, { x: 75, y: 45 }, { width: 3 })
  gfx.line({ x: 25, y: 55 }, { x: 75, y: 55 }, { width: 4 })
  gfx.line({ x: 25, y: 65 }, { x: 75, y: 65 }, { width: 5 })
  gfx.line({ x: 25, y: 75 }, { x: 75, y: 75 }, { width: 6 })
})

test('line colour', 'should draw lines in various colours', gfx => {
  gfx.line({ x: 25, y: 25 }, { x: 75, y: 25 })
  gfx.line({ x: 25, y: 35 }, { x: 75, y: 35 }, { colour: 'red' })
  gfx.line({ x: 25, y: 45 }, { x: 75, y: 45 }, { colour: 'orange' })
  gfx.line({ x: 25, y: 55 }, { x: 75, y: 55 }, { colour: 'yellow' })
  gfx.line({ x: 25, y: 65 }, { x: 75, y: 65 }, { colour: 'green' })
  gfx.line({ x: 25, y: 75 }, { x: 75, y: 75 }, { colour: 'blue' })
})

// circle testing
test('default circle', 'draw a default circle', gfx => {
  gfx.clear('#663399')
  gfx.circle({ x: 50, y: 50 }, 25)
})

test('circle outline', 'draw a black outline circle, no fill', gfx => {
  gfx.clear('#663399')
  gfx.circle({ x: 50, y: 50 }, 25, {
    line: { colour: 'black' }
  })
})

test('filled circle', 'draw a red circle, no outline', gfx => {
  gfx.clear('#663399')
  gfx.circle({ x: 50, y: 50 }, 25, { fill: { colour: 'red' } })
})

// rectangle testing
test(
  'default square',
  'should draw a black square with a white border',
  gfx => {
    gfx.clear('#663399')
    gfx.square({ x: 25, y: 25 }, 50)
  }
)

test('filled square', 'should draw a red square, no outline', gfx => {
  gfx.square({ x: 25, y: 25 }, 50, {
    fill: { colour: 'red' }
  })
})

test(
  'outlined square',
  'should draw a red square, no fill, outlined in black',
  gfx => {
    gfx.clear('#663399')
    gfx.square({ x: 25, y: 25 }, 50, {
      line: { colour: 'black' }
    })
  }
)

// text testing

// image testing

// sub image testing

// shadow testing

// dodge testing

// overlay testing

// transparency testing

// tile testing
Bramble.assets.loadTerrain('./terrain/default.json').then(terrain => {
  test(
    'auto tile',
    'should auto tile a staircase pattern',
    gfx => {
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
    },
    { smoothing: false }
  )
})
