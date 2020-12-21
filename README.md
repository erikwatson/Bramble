# Bramble

A little JavaScript library for making Video Games.

- [Level Editor](https://github.com/erikwatson/Level-Editor)
- [Type Docs](https://erikwatson.github.io/Bramble)

## Features

- Asset Loading
  - string
  - image
  - terrain
- Input Handling
  - keyboard
  - mouse
  - ~~gamepad~~
- Simple Drawing API
  - circles
  - rectangles
  - lines
  - images
  - animated sprites
  - text
  - tilesheets that auto-tile
  - effects (overlay, dodge, shadow, transparency)
- 2D Vectors
- ~~Music and SFX playback~~
- ~~Save Games~~

## Example

There's no docs for this yet really, but this is what a really basic, barebones
Bramble project looks like.

```js
const container = document.getElementById('some-div')
const game = Bramble.game.create()

game.attachTo(container)
game.setSize(1280. 720)

let mouse = game.getMouseState()

game.setUpdate(dt => {
  mouse = game.getMouseState()
})

game.setRender(gfx => {
  gfx.circle(mouse.x, mouse.y, 100)
})

game.start()
```

## Authors

- [Erik Watson](http://erikwatson.me)
