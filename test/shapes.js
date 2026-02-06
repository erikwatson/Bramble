// line testing
test('lines', 'should draw an x', gfx => {
  gfx.clear()
  gfx.line({ x: 25, y: 25 }, { x: 75, y: 75 })
  gfx.line({ x: 75, y: 25 }, { x: 25, y: 75 })
})

test('line thickness', 'should draw lines at various thicknesses', gfx => {
  gfx.clear()
  gfx.line({ x: 25, y: 25 }, { x: 75, y: 25 })
  gfx.line({ x: 25, y: 35 }, { x: 75, y: 35 }, { width: 2 })
  gfx.line({ x: 25, y: 45 }, { x: 75, y: 45 }, { width: 3 })
  gfx.line({ x: 25, y: 55 }, { x: 75, y: 55 }, { width: 4 })
  gfx.line({ x: 25, y: 65 }, { x: 75, y: 65 }, { width: 5 })
  gfx.line({ x: 25, y: 75 }, { x: 75, y: 75 }, { width: 6 })
})

test('line colour', 'should draw lines in various colours', gfx => {
  gfx.clear()
  gfx.line({ x: 25, y: 25 }, { x: 75, y: 25 })
  gfx.line({ x: 25, y: 35 }, { x: 75, y: 35 }, { colour: 'red' })
  gfx.line({ x: 25, y: 45 }, { x: 75, y: 45 }, { colour: 'orange' })
  gfx.line({ x: 25, y: 55 }, { x: 75, y: 55 }, { colour: 'yellow' })
  gfx.line({ x: 25, y: 65 }, { x: 75, y: 65 }, { colour: 'green' })
  gfx.line({ x: 25, y: 75 }, { x: 75, y: 75 }, { colour: 'blue' })
})

test(
  'line thickness and colour',
  'should draw lines in various colours and thicknesses',
  gfx => {
    gfx.clear()
    gfx.line({ x: 25, y: 25 }, { x: 75, y: 25 })
    gfx.line({ x: 25, y: 35 }, { x: 75, y: 35 }, { colour: 'red', width: 2 })
    gfx.line({ x: 25, y: 45 }, { x: 75, y: 45 }, { colour: 'orange', width: 3 })
    gfx.line({ x: 25, y: 55 }, { x: 75, y: 55 }, { colour: 'yellow', width: 4 })
    gfx.line({ x: 25, y: 65 }, { x: 75, y: 65 }, { colour: 'green', width: 5 })
    gfx.line({ x: 25, y: 75 }, { x: 75, y: 75 }, { colour: 'blue', width: 6 })
  }
)

// circle testing
test('default circle', 'draw a default circle', gfx => {
  gfx.clear('#663399')
  gfx.circle({ x: 50, y: 50 }, 25)
})

test('circle outline', 'draw a black outline circle, no fill', gfx => {
  gfx.clear('#663399')
  gfx.circle({ x: 50, y: 50 }, 25, {
    line: { colour: 'black' },
    fill: { opacity: 0 }
  })
})

test('filled circle', 'draw a red circle, no outline', gfx => {
  gfx.clear('#663399')
  gfx.circle({ x: 50, y: 50 }, 25, {
    fill: { colour: 'red' },
    line: { width: 0 }
  })
})

test(
  'circle with thick outline',
  'should draw a circle with a thick outline',
  gfx => {
    gfx.clear('#663399')
    gfx.circle({ x: 50, y: 50 }, 25, {
      line: { width: 4 }
    })
  }
)
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
  gfx.clear()
  gfx.square({ x: 25, y: 25 }, 50, {
    fill: { colour: 'red' },
    line: { width: 0 }
  })
})

test(
  'outlined square',
  'should draw a square, no fill, outlined in black',
  gfx => {
    gfx.clear('#663399')
    gfx.square({ x: 25, y: 25 }, 50, {
      fill: { opacity: 0 },
      line: { colour: 'black' }
    })
  }
)

test(
  'thick outlined square',
  'should draw a square, no fill, thick outline',
  gfx => {
    gfx.clear('#663399')
    gfx.square({ x: 25, y: 25 }, 50, {
      line: { width: 4 }
    })
  }
)

test(
  'default rectangle',
  'should draw a black rectangle with a white border',
  gfx => {
    gfx.clear('#663399')
    gfx.rect({ x: 25, y: 38, width: 50, height: 25 })
  }
)

test(
  'filled rectangle',
  'should draw a black rectangle with no border',
  gfx => {
    gfx.clear('#663399')
    gfx.rect(
      { x: 25, y: 38, width: 50, height: 25 },
      {
        fill: { colour: 'black' },
        line: { width: 0 }
      }
    )
  }
)

test(
  'outlined rectangle',
  'should draw a white outline of a rectangle',
  gfx => {
    gfx.clear('#663399')
    gfx.rect(
      { x: 25, y: 38, width: 50, height: 25 },
      {
        fill: { opacity: 0 },
        line: { colour: 'white' }
      }
    )
  }
)

test(
  'thick outline rectangle',
  'should draw a black rectangle with a thick white border',
  gfx => {
    gfx.clear('#663399')
    gfx.rect(
      { x: 25, y: 38, width: 50, height: 25 },
      {
        line: { width: 4 }
      }
    )
  }
)

// curve testing
test('curve', 'should draw a white curve with 2 control points', gfx => {
  gfx.clear('#663399')
  gfx.curve(
    { x: 0, y: 50 },
    { x: 100, y: 50 },
    { cp1: { x: 25, y: 0 }, cp2: { x: 75, y: 100 } },
    { width: 6, colour: 'white' }
  )
})
