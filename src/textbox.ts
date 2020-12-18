import { TextBox } from './types'

function create(x = 0, y = 0, width = 100, height = 50, text = ''): TextBox {
  return { x, y, width, height, text }
}

export default { create }
