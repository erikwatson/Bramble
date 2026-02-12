**WARNING:** This is not _yet_ a stable API. It is very likely to change between now and 1.0.0, so don't build anything ambitious with it yet.

# Bramble

A creative coding library for the web.

- [Type Docs](https://erikwatson.github.io/bramble-type-docs/)
- [Instructions](https://github.com/erikwatson/Bramble/wiki)

## Features

- Asset loading
  - data
  - image
  - sound
- Input handling
  - keyboard
  - mouse
  - ~~gamepad~~
- Simple drawing API
  - text
  - lines
  - shapes
  - images
  - effects
- Simple audio API
- Save/load persistent state
- Math
  - 2D vectors
  - Collision detection

## Example

```js
const game = Bramble.game.create()
const container = document.getElementById('bramble-container')

game.attachTo(container)
game.setSize(500, 500)

const id = 'song'
const assetType = 'sound'
const assetPath = 'test.mp3'

await game.assets.add(id, assetType, assetPath)

let hero = {
  position: { x: 0, y: 0 },
  size: 50,
  colour: 'white'
}

let isPlaying = false

game.setUpdate(({ input, sfx }) => {
  hero.position = input.mouse.position

  // start / stop the music
  if (input.mouse.left.justPressed || input.keyboard.space.justPressed) {
    if (isPlaying) {
      sfx.stop(id)
    } else {
      sfx.play(id)
    }

    isPlaying = !isPlaying
  }
})

const blurAmount = 8

game.setRender(({ gfx }) => {
  gfx.clear('black')

  gfx.blur(() => {
    gfx.circle(hero.position, hero.size, {
      fill: { colour: hero.colour },
      line: { width: 0 }
    })
  }, blurAmount)
})

game.start()
```

## Authors

- [Erik Watson](http://erikwatson.me)

# Package developers only

## To publish

1. Change and commit the code
2. Run a production build with `npm run build:prod`
3. Update the version number `npm version major` `npm version minor` or `npm version patch`
4. `npm run release`
