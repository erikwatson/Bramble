import { game } from '../dist/bramble'

const g = game.create()

g.assets.add('erik-test', 'image', 'https://avatars.githubusercontent.com/u/4023639?v=4')

g.setRender(({ gfx, assets }) => {
  assets.images.erikTest
})
