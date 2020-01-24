# Bramble

A little JavaScript game engine. This was developed for small personal projects
and prototypes.

**This is not yet intended for public use**

## Documentation

```js
// The div we're going to attach our game to
const container = document.querySelector('#bramble-view')
const game = Bramble.game.create()

game.attachTo(container)
game.setSize(this.props.width, this.props.height)
game.setSmoothing(false)
game.disableContextMenu()
```

## Authors

- [Erik Watson](http://erikwatson.me)
