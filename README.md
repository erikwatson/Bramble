**WARNING:** This is not _yet_ a stable API. It is very likely to change between now and 1.0.0, so don't build anything ambitious with it yet.

# Bramble

A little JavaScript library for making Video Games.

- [Type Docs](https://erikwatson.github.io/bramble-type-docs/)
- [Instructions](https://github.com/erikwatson/Bramble/wiki)

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
- Collision Detection
  - Point vs Rectangle
  - Line vs Rectangle
  - Rectangle vs Rectangle
  - Dynamic Rectangle vs Rectangle
  - Line vs Quadratic Bezier curve
- 2D Vectors
- ~~Music and SFX playback~~
- Save/Load

## Authors

- [Erik Watson](http://erikwatson.me)


# Package developers only

## To publish

1. Change and commit the code
2. Run a production build with `npm run build:prod`
3. Update the version number `npm version major` `npm version minor` or `npm version patch`
4. `npm run publish`

