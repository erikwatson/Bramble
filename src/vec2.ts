import { Vec2 } from './types'

function create(_x: number, _y: number): Vec2 {
  let x = _x
  let y = _y

  const add = (v: Vec2): void => {
    x += v.x
    y += v.y
  }

  const addScalar = (s: number): void => {
    x += s
    y += s
  }

  const divide = (v: Vec2): void => {
    x /= v.x
    y /= v.y
  }

  const divideScalar = (s: number): void => {
    x /= s
    y /= s
  }

  const dot = (v: Vec2): number => {
    return x * v.x + y * v.y
  }

  const getLength = (): number => {
    return Math.sqrt(x * x + y * y)
  }

  const getOpposite = (v: Vec2): Vec2 => {
    return create(-v.x, -v.y)
  }

  const getPerp = (): Vec2 => {
    return create(-y, x)
  }

  const isEqualTo = (v: Vec2): boolean => {
    return x == v.x && y == v.y
  }

  const multiply = (v: Vec2): void => {
    x *= v.x
    y *= v.y
  }

  const multiplyScalar = (s: number): void => {
    x *= s
    y *= s
  }

  const normalise = (): void => {
    let l = getLength()

    x = x / l
    y = y / l
  }

  const setLength = (l: number): void => {
    normalise()
    multiplyScalar(l)
  }

  const subtract = (v: Vec2): void => {
    x -= v.x
    y -= v.y
  }

  const subtractScalar = (s: number): void => {
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
