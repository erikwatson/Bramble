interface TextBox {
  x: number
  y: number
  width: number
  height: number
  text: string
}

function create(x = 0, y = 0, width = 100, height = 50, text = ''): TextBox {
  return { x, y, width, height, text }
}

export default { create }
