interface Vec2 {
  add: (v: Vec2) => void
  addScalar: (s: number) => void
  clone: (v: Vec2) => Vec2
  divide: (v: Vec2) => void
  divideScalar: (s: number) => void
  dot: (v: Vec2) => number
  getLength: () => number
  getOpposite: (v: Vec2) => Vec2
  getPerp: () => Vec2
  isEqualTo: (v: Vec2) => boolean
  multiply: (v: Vec2) => void
  multiplyScalar: (s: number) => void
  normalise: () => void
  setLength: (l: number) => void
  subtract: (v: Vec2) => void
  subtractScalar: (s: number) => void
  x: number
  y: number
}

function create(_x: number, _y: number): Vec2 {
  let x = _x
  let y = _y

  const add = v => {
    x += v.x
    y += v.y
  }

  const addScalar = s => {
    x += s
    y += s
  }

  const divide = v => {
    x /= v.x
    y /= v.y
  }

  const divideScalar = s => {
    x /= s
    y /= s
  }

  const dot = v => {
    return x * v.x + y * v.y
  }

  const getLength = () => {
    return Math.sqrt(x * x + y * y)
  }

  const getOpposite = v => {
    return create(-v.x, -v.y)
  }

  const getPerp = () => {
    return create(-y, x)
  }

  const isEqualTo = v => {
    return x == v.x && y == v.y
  }

  const multiply = v => {
    x *= v.x
    y *= v.y
  }

  const multiplyScalar = s => {
    x *= s
    y *= s
  }

  const normalise = () => {
    let l = getLength()

    x = x / l
    y = y / l
  }

  const setLength = l => {
    normalise()
    multiplyScalar(l)
  }

  const subtract = v => {
    x -= v.x
    y -= v.y
  }

  const subtractScalar = s => {
    x -= s
    y -= s
  }

  return {
    add,
    addScalar,
    clone,
    divide,
    divideScalar,
    dot,
    getLength,
    getOpposite,
    getPerp,
    isEqualTo,
    multiply,
    multiplyScalar,
    normalise,
    setLength,
    subtract,
    subtractScalar,
    set x(_x) {
      x = _x
    },
    get x() {
      return x
    },
    set y(_y) {
      y = _y
    },
    get y() {
      return y
    }
  }
}

const fromDegrees = (degrees: number): Vec2 => {
  const rad = degrees * (Math.PI / 180)
  return create(Math.cos(rad), Math.sin(rad))
}

const clone = (v: Vec2): Vec2 => {
  return create(v.x, v.y)
}

export default {
  clone,
  create,
  fromDegrees
}
