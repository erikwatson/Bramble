// TODO: Handle Arrays
function deepClone(obj: Object): Object {
  const result = {}

  Object.keys(obj).forEach(key => {
    switch (typeof obj[key]) {
      case 'object':
        result[key] = deepClone(obj[key])
        break

      default:
        result[key] = obj[key]
    }
  })

  return result
}

function shallowClone(obj: Object): Object {
  return { ...obj }
}

export function clone(obj: Object, deep: Boolean = true): Object {
  return deep === true ? deepClone(obj) : shallowClone(obj)
}

// TODO: Handle Arrays
function deepMerge(a: Object, b: Object): Object {
  const result = {}

  Object.keys(a).forEach(key => {
    if (typeof a[key] === 'object') {
      result[key] = b[key] === undefined ? a[key] : merge(a[key], b[key])
    } else {
      result[key] = b[key] === undefined ? a[key] : b[key]
    }
  })

  // values that only exist on b need to be inserted afterwards
  Object.keys(b).forEach(key => {
    if (a[key] === undefined) {
      result[key] = b[key]
    }
  })

  return result
}

function shallowMerge(a: Object, b: Object): Object {
  return { ...a, ...b }
}

export function merge(a: Object, b: Object, deep: Boolean = true): Object {
  return deep === true ? deepMerge(a, b) : shallowMerge(a, b)
}

export default {
  merge,
  clone
}
