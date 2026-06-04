export function clamp(value: number, min: number, max: number) {
  if (min > max) {
    console.error(`clamp: the minimum (${min}) and maximum (${max}) have been passed in the wrong order`)
    return value
  }

  if (value < min) { return min }
  if (value > max) { return max }
  return value
}

