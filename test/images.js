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
          fill:
          {
            colour: 'red'
          }
        }
      )
    })
  }
)
