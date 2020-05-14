# Bramble

A little JavaScript game engine. This was developed for small personal projects
and prototypes.

Does not currently use WebGL, but instead the canvas 2d drawing api for graphics.

**This is not yet intended for public use, but I quite like it**

## Documentation

When I put together a new Bramble project it looks something like this.

```js
const {
  assets,
  game,
  graphics,
  grid,
  keyboard,
  mouse
} = require('@erikwatson/bramble')

const container = document.querySelector('#bramble-view')
const gameProps = { width: 1280, height: 720, smooth: false }
let spritesheets = [] // loaded async later

game.attachTo(container)
game.disableContextMenu()
game.setSize(gameProps.width, gameProps.height)
game.setSmoothing(gameProps.smooth)

const player = {
  x: gameProps.width / 2,
  y: gameProps.height / 2,
  size: 10,
  speed: 2
}

const camera = { x: 0, y: 0 }
const grid = grid.create(100, 100)

game.setUpdate(deltaTime => {
  if (mouse.left.pressed) {
    player.x -= player.speed
  }

  if (mouse.right.pressed) {
    player.y += player.speed
  }
})

game.setRender(() => {
  graphics.clear('#000000')

  // draw a tile map
  graphics.tiles(
    camera.x,
    camera.y,
    grid.tiles,
    spritesheets,
    grid.scale,
    grid.tileSize,
    grid.tileSize
  )

  // draw a square representing the player character
  graphics.square(player.x, player.y, player.size)
})

// start the game as soon as we have all our assets loaded
Promise.all([
  assets.loadTerrain('./terrain/default.json'),
  assets.loadTerrain('./terrain/green-hills.json')
])
  .then(terrain => {
    spritesheets = terrain
    game.start()
  })
  .catch(err => {
    console.error(err)
  })
```

## Example Project

- [Level Editor](https://github.com/championchap/Level-Editor) - A work in progress Level Editor using Bramble, this is currently the best place to see a working example.

## Authors

- [Erik Watson](http://erikwatson.me)
