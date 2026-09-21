# Bramble

An intuitive creative coding library for the web.

> **Warning:** Bramble does not have a stable 1.0.0 API yet. The API is still evolving and may change between releases. Avoid building anything ambitious on top of it until 1.0.0.

* [Type Docs](https://erikwatson.github.io/bramble-type-docs/)
* [Wiki](https://github.com/erikwatson/Bramble/wiki)

## Features

Bramble provides a small set of APIs for building interactive graphics applications and games in the browser.

* Game loop

  * update callbacks
  * render callbacks
  * delta time
* Graphics

  * circles, rectangles and lines
  * curves
  * text
  * images and image regions
  * transforms
  * compositing effects
  * shadows and glows
  * blur and colour effects
* Input

  * keyboard
  * mouse
* Assets

  * data
  * images
  * sound
* Audio

  * sound effects
* Persistent state

  * save/load
* Math

  * 2D vectors
  * collision detection

Some APIs are still experimental or unfinished and are not documented here yet.

## Getting started

Install Bramble from npm:

```bash
npm install @erikwatson/bramble
```

Bramble can also be used directly in the browser with the standalone browser build.

### Browser

The browser build exposes `Bramble` as a global:

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Bramble</title>
</head>
<body>
  <div id="bramble-container"></div>

  <script src="./bramble.js"></script>
  <script src="./game.js"></script>
</body>
</html>
```

Then create a game with:

```js
const game = Bramble.game.create()
```

### ES modules

When using Bramble as an npm package:

```js
import Bramble from '@erikwatson/bramble'

const game = Bramble.game.create()
```

### CommonJS

Bramble also provides a CommonJS build:

```js
const Bramble = require('@erikwatson/bramble')

const game = Bramble.game.create()
```

## Your first game

Create a game, attach it to a container, configure its size, provide update and render callbacks, and start it:

```js
const game = Bramble.game.create()

const container = document.getElementById('bramble-container')

game.attachTo(container)

game.setSize(800, 600)

game.setBackgroundColour('#111')

const player = {
  position: { x: 400, y: 300 },
  radius: 24
}

game.setUpdate(({ input, dt }) => {
  const speed = 300

  if (input.keyboard.left.pressed || input.keyboard.A.pressed) {
    player.position.x -= speed * dt
  }

  if (input.keyboard.right.pressed || input.keyboard.D.pressed) {
    player.position.x += speed * dt
  }

  if (input.keyboard.up.pressed || input.keyboard.W.pressed) {
    player.position.y -= speed * dt
  }

  if (input.keyboard.down.pressed || input.keyboard.S.pressed) {
    player.position.y += speed * dt
  }
})

game.setRender(({ gfx }) => {
  gfx.clear('#111')

  gfx.circle(player.position, player.radius, {
    fill: {
      colour: '#fff'
    },
    line: {
      width: 0
    }
  })
})

game.start()
```

This example uses the core game, input and graphics APIs.

## Input

Keyboard state is available directly through `input.keyboard`.

Each key exposes four states:

```js
input.keyboard.left.pressed
input.keyboard.left.justPressed
input.keyboard.left.released
input.keyboard.left.justReleased
```

For example:

```js
game.setUpdate(({ input }) => {
  if (input.keyboard.space.justPressed) {
    // Jump
  }
})
```

Mouse state is available through `input.mouse`:

```js
input.mouse.position
input.mouse.left.pressed
input.mouse.left.justPressed
```

## Graphics

The graphics API is available through `gfx` in the render callback.

Basic shapes:

```js
gfx.circle(position, radius, options)

gfx.square(position, size, options)

gfx.rect(rectangle, options)

gfx.line(from, to, options)

gfx.curve(from, to, controlPoints, options)
```

Text:

```js
gfx.text(position, 'Hello, Bramble', {
  colour: 'white',
  size: 24,
  family: 'sans-serif'
})
```

Images:

```js
gfx.image(image, position, size)
```

A region of an image can be drawn with `subImage`:

```js
gfx.subImage(
  image,
  position,
  size,
  subPosition,
  subSize
)
```

This can be useful for drawing individual regions from a sprite sheet without using the higher-level sprite API.

## Effects and transforms

Graphics operations can be wrapped in effects:

```js
gfx.opacity(() => {
  gfx.circle({ x: 100, y: 100 }, 50, options)
}, 0.5)
```

Other available effects include:

```js
gfx.shadow(...)
gfx.dodge(...)
gfx.overlay(...)
gfx.multiply(...)
gfx.screen(...)
gfx.blur(...)
gfx.colourShift(...)
gfx.strokeGlow(...)
```

Transforms can be applied to groups of drawing operations:

```js
gfx.transform(() => {
  gfx.image(image, position, size)
}, {
  angle: 45,
  scale: 2,
  around: position
})
```

Individual rotation is also available:

```js
gfx.rotate(() => {
  gfx.rect(rectangle, options)
}, angle, around)
```

## Assets

Assets can be loaded and accessed through the game's asset system.

For example:

```js
await game.assets.add('player', 'image', 'player.png')
```

The asset system supports images, sound and data.

## Audio

Loaded sound assets can be played through the game's sound effects API:

```js
sfx.play('laser')
```

and stopped with:

```js
sfx.stop('laser')
```

## Vectors

Bramble includes a small 2D vector API:

```js
const position = Bramble.vec2.create(100, 100)

position.add({ x: 10, y: 20 })

position.multiplyScalar(2)
```

Vectors provide common operations such as addition, subtraction, multiplication, division, dot products, normalisation and length calculations.

## TypeScript

Bramble is written in TypeScript and publishes type information.

Generated type documentation is available here:

[Type Docs](https://erikwatson.github.io/bramble-type-docs/)

## Authors

[Erik Watson](http://erikwatson.me)

# Package developers only

## Publishing

1. Change and commit the code.

2. Run a production build:

```bash
npm run build
```

3. Update the package version:

```bash
npm version major
npm version minor
npm version patch
```

4. Publish the release:

```bash
npm run release
```
