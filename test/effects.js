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

test(
  'blur + colourShift',
  'draw a circle with blur and colourShift',
  ({ gfx }) => {
    gfx.clear('white')
    gfx.blur(() => {
      gfx.colourShift(() => {
        gfx.circle({ x: 50, y: 50 }, 25, { fill: { colour: 'red' } })
      }, { hue: 180, saturate: 2 })
    }, 5)
  }
)

test(
  'blur + colourShift + shadow',
  'draw a circle with blur, colourShift, and shadow',
  ({ gfx }) => {
    gfx.clear('white')
    gfx.shadow(() => {
      gfx.blur(() => {
        gfx.colourShift(() => {
          gfx.circle({ x: 50, y: 50 }, 25, { fill: { colour: 'blue' } })
        }, { hue: 90, saturate: 1.5 })
      }, 4)
    }, { shadowColour: 'black', shadowBlur: 6 })
  }
)

test(
  'strokeGlow + blur + transparency',
  'draw a circle with strokeGlow, blur, and transparency',
  ({ gfx }) => {
    gfx.clear('black')
    gfx.transparency(() => {
      gfx.blur(() => {
        gfx.strokeGlow(() => {
          gfx.circle({ x: 50, y: 50 }, 25, { fill: { colour: 'white' }, line: { colour: 'cyan', width: 3 } })
        }, { color: 'cyan', blur: 6 })
      }, 4)
    }, 0.5)
  }
)

// blur + shadow
test(
  'blur + shadow',
  'draw a circle with a soft blur and a shadow behind it',
  ({ gfx }) => {
    gfx.clear('white')
    gfx.blur(() =>
      gfx.shadow(() => gfx.circle({ x: 50, y: 50 }, 25, { fill: { colour: 'orange' } })),
    8)
  }
)

// colourShift + shadow
test(
  'colourShift + shadow',
  'draw a circle with hue/saturation shift and a shadow',
  ({ gfx }) => {
    // TODO: implement
  }
)

// blur + transparency
test(
  'blur + transparency',
  'draw a partially transparent circle with blurred edges',
  ({ gfx }) => {
    // TODO: implement
  }
)

// colourShift + transparency
test(
  'colourShift + transparency',
  'draw a partially transparent circle with hue and saturation changes',
  ({ gfx }) => {
    // TODO: implement
  }
)

// shadow + transparency
test(
  'shadow + transparency',
  'draw a semi-transparent circle with a shadow cast behind it',
  ({ gfx }) => {
    // TODO: implement
  }
)

// blur + colourShift + strokeGlow
test(
  'blur + colourShift + strokeGlow',
  'draw a circle with blur, colour adjustment, and a glowing stroke',
  ({ gfx }) => {
    // TODO: implement
  }
)

// blur + shadow + strokeGlow
test(
  'blur + shadow + strokeGlow',
  'draw a circle with blur, shadow, and a glowing outline',
  ({ gfx }) => {
    // TODO: implement
  }
)

// colourShift + shadow + strokeGlow
test(
  'colourShift + shadow + strokeGlow',
  'draw a circle with hue/saturation change, shadow, and glowing stroke',
  ({ gfx }) => {
    // TODO: implement
  }
)

// transparency + strokeGlow
test(
  'transparency + strokeGlow',
  'draw a semi-transparent circle with a glowing outline',
  ({ gfx }) => {
    // TODO: implement
  }
)

// transparency + shadow + strokeGlow
test(
  'transparency + shadow + strokeGlow',
  'draw a semi-transparent circle with shadow and glowing stroke',
  ({ gfx }) => {
    // TODO: implement
  }
)

// transparency + blur + strokeGlow
test(
  'transparency + blur + strokeGlow',
  'draw a semi-transparent circle with blurred edges and glowing stroke',
  ({ gfx }) => {
    // TODO: implement
  }
)
