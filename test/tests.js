// clear testing
test('clear', 'should show black', gfx => {
  gfx.circle({ x: 50, y: 50 }, 25)
  gfx.clear()
})

test('clear to a colour', 'should show red', gfx => {
  gfx.clear('red')
})

test('clear rectangle', 'should display half a circle', gfx => {
  gfx.circle({ x: 50, y: 50 }, 25)
  gfx.clearRect({ x: 0, y: 0, width: 50, height: 100 })
})

test('clear rectangle to colour', 'should display half a circle', gfx => {
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

test(
  'line thickness and colour',
  'should draw lines in various colours and thicknesses',
  gfx => {
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
test('text', 'should say hello', gfx => {
  gfx.clear('white')
  gfx.text({ x: 22, y: 40 }, 'Hello')
})

test('text colour', 'should say hello in red', gfx => {
  gfx.clear('black')
  gfx.text({ x: 22, y: 40 }, 'Hello', 'red')
})

test('text font', 'should say hello in a serif font', gfx => {
  gfx.clear('white')
  gfx.text({ x: 22, y: 40 }, 'Hello', 'black', '16pt serif')
})

// image testing
Bramble.assets.loadImage('./images/panda.png').then(img => {
  test(
    'image',
    'should display sky panda in headphones, scaled to fit',
    gfx => {
      gfx.image({ x: 0, y: 0 }, { width: 100, height: 100 }, img)
    }
  )
})

// sub image testing
Bramble.assets.loadImage('./images/panda.png').then(img => {
  test(
    'sub image',
    'should display just a part of the sky panda image',
    gfx => {
      gfx.subImage(
        { x: 0, y: 0 },
        { width: 100, height: 100 },
        { x: 100, y: 100 },
        { width: 100, height: 100 },
        img
      )
    }
  )
})

// shadow testing
test('shadow', 'should add a shadow to a circle', gfx => {
  gfx.clear('white')
  gfx.shadow(() => {
    gfx.circle({ x: 50, y: 50 }, 25)
  })
})

// dodge testing
test('dodge', 'should draw a circle dodging a rectangle', gfx => {
  gfx.clear('#666666')
  gfx.rect(
    { x: 15, y: 15, width: 50, height: 50 },
    { fill: { colour: 'black' } }
  )

  gfx.dodge(() => {
    gfx.circle({ x: 65, y: 65 }, 25, { fill: { colour: 'red' } })
  })
})

// overlay testing
test('overlay', 'should draw a circle overlayed on a rectangle', gfx => {
  gfx.clear('#663399')
  gfx.rect(
    { x: 15, y: 15, width: 50, height: 50 },
    { fill: { colour: 'green' } }
  )

  gfx.overlay(() => {
    gfx.circle({ x: 65, y: 65 }, 25, { fill: { colour: 'white' } })
  })
})

// transparency testing
test(
  'transparency',
  'should draw a 25% transparent circle over an opaque rectangle',
  gfx => {
    gfx.rect(
      { x: 15, y: 15, width: 50, height: 50 },
      { fill: { colour: 'blue' } }
    )

    gfx.transparency(() => {
      gfx.circle({ x: 65, y: 65 }, 25, { fill: { colour: 'red' } })
    })
  }
)

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
