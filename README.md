# Bramble

A little game engine for jamming on prototypes.

__This is not yet intended for public use__


## Example

```js
import {
  game, graphics, input, assets, music, sfx, sprite
} from './bramble/bramble'

import { onLoaded } from './events'

const width = 640
const height = 360

const halfWidth = width / 2
const halfHeight = height / 2

let hero = null

function update (delta) {
  const { mouse, keys } = input.getState()

  if (mouse.pressed) {
    hero.color = '#232323'
    hero.width = 32
    hero.height = 32
  } else {
    hero.color = '#ffffff'
    hero.width = 64
    hero.height = 64
  }

  hero.rotation ++

  hero.x = mouse.x - hero.width / 2
  hero.y = mouse.y - hero.height / 2
}

function render () {
  graphics.rect(0, 0, halfWidth, halfHeight, '#993366')
  graphics.rect(halfWidth, 0, halfWidth, halfHeight, '#669933')
  graphics.rect(halfWidth, halfHeight, halfWidth, halfHeight, '#993366')
  graphics.rect(0, halfHeight, halfWidth, halfHeight, '#669933')

  graphics.sprite(hero)

  graphics.text(
    10,
    30,
    `Hero: ${JSON.stringify(hero)}`,
    '#000000',
    '12pt sans-serif'
  )
}

function start () {
  const container = document.getElementById('app-container')
  game.attachTo(container)

  game.setSize(width, height)
  game.setUpdate(update)
  game.setRender(render)

  game.start()
}

function load () {
  assets.loadImage('images/hero.jpg')
    .then(img => {
      hero = sprite.create(0, 0, 32, 32, 45, img)
    })
    .then(() => start())
    .catch(err => console.error(err))
}

onLoaded(() => {
  load()
})
```

## Authors

  + [Erik Watson](http://erikwatson.me)
