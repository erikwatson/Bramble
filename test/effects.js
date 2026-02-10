// transparency testing
test(
  'transparency',
  'should draw a 25% transparent circle over an opaque rectangle',
 ({ gfx })=> {
    gfx.clear()
    gfx.rect(
      { x: 15, y: 15, width: 50, height: 50 },
      { fill: { colour: 'blue' } }
    )

    gfx.transparency(() => {
      gfx.circle(
        {
          x: 65,
          y: 65
        },
        25,
        {
          fill: {
            colour: 'red'
          }
        }
      )
    })
  }
)

// shadow testing
test('shadow', 'should add a shadow to a circle',({ gfx })=> {
  gfx.clear('white')
  gfx.shadow(() => {
    gfx.circle({ x: 50, y: 50 }, 25)
  })
})

// dodge testing
test(
  'dodge',
  'should draw two rectangles, the overlapping section should be brighter than the base colour of the leftmost rectangle',
 ({ gfx })=> {
    gfx.clear('#663399')

    // darker base makes highlights pop more
    gfx.square({ x: 12, y: 12 }, 50, {
      fill: { colour: 'rgb(20, 20, 80)' },
      line: { width: 0 }
    })

    // brighter source for stronger dodge
    gfx.dodge(() => {
      gfx.square({ x: 38, y: 38 }, 50, {
        fill: { colour: 'rgb(150, 150, 150)' }, // bright grey
        line: { width: 0 }
      })
    })
  }
)


// overlay testing
test('overlay', 'should draw a circle overlayed on a rectangle',({ gfx })=> {
  gfx.clear('#663399')
  gfx.rect(
    { x: 15, y: 15, width: 50, height: 50 },
    { fill: { colour: 'green' } }
  )

  gfx.overlay(() => {
    gfx.circle({ x: 65, y: 65 }, 25, { fill: { colour: 'white' } })
  })
})

// multiply testing
test('multiply', 'should darken overlapping shapes using multiply',({ gfx })=> {
  gfx.clear('white')

  gfx.rect({ x: 10, y: 10, width: 40, height: 40 }, { fill: { colour: 'red' } })

  gfx.multiply(() => {
    gfx.circle({ x: 50, y: 50 }, 30, { fill: { colour: 'blue' } })
  })
})

// screen testing
test('screen', 'should brighten overlapping shapes using screen',({ gfx })=> {
  gfx.clear('black')

  gfx.rect({ x: 10, y: 10, width: 40, height: 40 }, { fill: { colour: 'red' } })

  gfx.screen(() => {
    gfx.circle({ x: 50, y: 50 }, 30, { fill: { colour: 'blue' } })
  })
})

// blur testing
test('blur', 'should draw a blurred circle over a rectangle',({ gfx })=> {
  gfx.clear('white')

  gfx.rect(
    { x: 10, y: 10, width: 40, height: 40 },
    { fill: { colour: 'green' } }
  )

  gfx.blur(() => {
    gfx.circle({ x: 50, y: 50 }, 25, { fill: { colour: 'red' } })
  }, 5) // 5px blur radius
})

// colourShift testing
test('colourShift', 'should draw 3 circles, a grey one, a green one, and a lighter green one',({ gfx })=> {
  gfx.clear('white')

  gfx.colourShift(
    () => {
      gfx.circle({ x: 35, y: 35 }, 25, {
        fill: { colour: 'red' },
        line: { width: 0 }
      })
    },
    { hue: 90, saturate: 0 }
  )

  gfx.colourShift(
    () => {
      gfx.circle({ x: 50, y: 50 }, 25, {
        fill: { colour: 'red' },
        line: { width: 0 }
      })
    },
    { hue: 90, saturate: 1 }
  )

  gfx.colourShift(
    () => {
      gfx.circle({ x: 65, y: 65 }, 25, {
        fill: { colour: 'red' },
        line: { width: 0 }
      })
    },
    { hue: 90, saturate: 2 }
  )
})

// strokeGlow testing
test('strokeGlow', 'should draw a circle with a glowing stroke',({ gfx })=> {
  gfx.clear('black')

  gfx.strokeGlow(
    () => {
      gfx.circle({ x: 50, y: 50 }, 25, {
        fill: { colour: 'white' },
        line: { colour: 'cyan', width: 4 }
      })
    },
    { color: 'cyan', blur: 8 }
  )
})
