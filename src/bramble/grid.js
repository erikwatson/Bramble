function make2DArray(width = 1, height = 1, defaultValue = null) {
  let result = []

  for (let y = 0; y < height; y++) {
    let row = []

    for (let x = 0; x < width; x++) {
      row.push(defaultValue)
    }

    result.push(row)
  }

  return result
}

function create(width, height) {
  let grid = make2DArray(width, height, 0)

  const getCell = (x, y) => grid[y][x]

  const setCell = (x, y, value) => {
    grid[y][x] = value
  }

  return {
    getCell,
    setCell
  }
}

export default {
  create
}
