# Bramble

A little game engine for jamming on prototypes.

__This is not yet intended for public use__


## Example

```js
import game from './bramble/game'
import gfx from './bramble/graphics'
import input from './bramble/input'

const width = 640
const height = 360

const halfWidth = width / 2
const halfHeight = height / 2

const hero = {
  position: { x: 0, y: 0 },
  size: { width: 32, height: 32 },
  color: '#ffffff'
}

function update (delta) {
  const { mouse, keys } = input.getState()

  // Hero should follow the player mouse position, centered
  hero.position = {
    x: mouse.x - hero.size.width / 2,
    y: mouse.y - hero.size.height / 2
  }

  // Make the hero larger and darker when the left mouse button is down
  if (mouse.pressed) {
    hero.color = '#232323'
    hero.size.width = 42
    hero.size.height = 42
  } else {
    hero.color = '#ffffff'
    hero.size.width = 32
    hero.size.height = 32
  }
}

function render () {
  // Drawing a background
  gfx.rect(0, 0, halfWidth, halfHeight, '#993366')
  gfx.rect(halfWidth, 0, halfWidth, halfHeight, '#669933')
  gfx.rect(halfWidth, halfHeight, halfWidth, halfHeight, '#993366')
  gfx.rect(0, halfHeight, halfWidth, halfHeight, '#669933')

  // Drawing the "Hero"
  gfx.rect(
    hero.position.x,
    hero.position.y,
    hero.size.width,
    hero.size.height,
    hero.color
  )
}

// Setup
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('app-container')
  game.attachTo(container)

  game.setSize(width, height)
  game.setUpdate(update)
  game.setRender(render)

  game.start()
})
```

## Authors

  + [Erik Watson](http://erikwatson.me)
