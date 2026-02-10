// text testing
test('text', 'should say hello',({ gfx })=> {
  gfx.clear('white')
  gfx.text({ x: 22, y: 40 }, 'Hello')
})

test('text colour', 'should say hello in red',({ gfx })=> {
  gfx.clear('black')
  gfx.text({ x: 22, y: 40 }, 'Hello', {
    colour: 'red'
  })
})

test('text font', 'should say hello in a serif font',({ gfx })=> {
  gfx.clear('white')
  gfx.text({ x: 22, y: 40 }, 'Hello', {
    size: '16pt',
    family: 'serif',
    color: 'black'
  })
})
