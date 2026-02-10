// test('strokeGlow', 'should draw a circle with a glowing stroke', ({ gfx })=> {
//   gfx.clear('black')

//   gfx.strokeGlow(
//     () => {
//       gfx.circle({ x: 50, y: 50 }, 25, {
//         fill: { colour: 'green' },
//         line: { colour: 'cyan', width: 2 }
//       })
//     },
//     { color: 'red', blur: 80 }
//   )
// })

test('', '', ({ gfx }) => {
  gfx.clear('white')

  gfx.blur(() => {
    gfx.strokeGlow(() => {
      gfx.circle(
        { x: 50, y: 50 },
        25,
        {
          fill: { colour: 'transparent' },
          line: { colour: 'white', width: 2 }
        }
      )
    }, { colour: 'black', blur: 5 })
  }, 5)
})
