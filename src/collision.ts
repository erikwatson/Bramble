import { vec2 } from './bramble'

// works
function pointVsRect(point, rect) {
  return (
    point.x >= rect.x &&
    point.y >= rect.y &&
    point.x < rect.x + rect.width &&
    point.y < rect.y + rect.height
  )
}

// works
function rectVsRect(rectA, rectB) {
  return (
    rectA.x < rectB.x + rectB.width &&
    rectA.x + rectA.width > rectB.x &&
    rectA.y < rectB.y + rectB.height &&
    rectA.y + rectA.height > rectB.y
  )
}

// works
// returns false if no collision occurred, otherwise it returns an object
// containing the results of the collision
// { near, far, normal }
function lineVsRect(line, rect) {
  const from = vec2.create(line.from.x, line.from.y)
  const to = vec2.create(line.to.x, line.to.y)

  const dir = vec2.clone(to)
  dir.subtract(from)

  const invdir = {
    x: 1.0 / dir.x,
    y: 1.0 / dir.y
  }

  const timeNear = {
    x: (rect.x - line.from.x) * invdir.x,
    y: (rect.y - line.from.y) * invdir.y
  }

  const timeFar = {
    x: (rect.x + rect.width - line.from.x) * invdir.x,
    y: (rect.y + rect.height - line.from.y) * invdir.y
  }

  if (isNaN(timeNear.x) || isNaN(timeNear.y)) {
    return false
  }

  if (isNaN(timeFar.x) || isNaN(timeFar.y)) {
    return false
  }

  // sort the distances
  let tempNear = { ...timeNear }
  let tempFar = { ...timeFar }

  if (tempNear.x > tempFar.x) {
    timeNear.x = tempFar.x
    timeFar.x = tempNear.x
  }

  tempNear = { ...timeNear }
  tempFar = { ...timeFar }

  if (tempNear.y > tempFar.y) {
    timeNear.y = tempFar.y
    timeFar.y = tempNear.y
  }

  // no collision detected
  if (timeNear.x > timeFar.y || timeNear.y > timeFar.x) {
    return false
  }

  const hitNear = Math.max(timeNear.x, timeNear.y)
  const hitFar = Math.min(timeFar.x, timeFar.y)

  // abort if ray is facing away from our object
  if (hitFar < 0) {
    return false
  }

  // abort if the ray does not reach the object
  if (hitNear > 1) {
    return false
  }

  // abort if the ray's first collision is behind us
  if (hitNear < 0) {
    return false
  }

  // construct a vector to hold the normal of the surface
  const normal = vec2.create(0, 0)

  if (timeNear.x > timeNear.y) {
    if (invdir.x < 0) {
      normal.x = 1
      normal.y = 0
    } else {
      normal.x = -1
      normal.y = 0
    }
  } else if (timeNear.x < timeNear.y) {
    if (invdir.y < 0) {
      normal.x = 0
      normal.y = 1
    } else {
      normal.x = 0
      normal.y = -1
    }
  } else if (timeNear.x === timeNear.y) {
    if (invdir.x < 0 && invdir.y < 0) {
      normal.x = -1
      normal.y = 1
    } else if (invdir.x > 0 && invdir.y < 0) {
      normal.x = 1
      normal.y = 1
    } else if (invdir.x < 0 && invdir.y > 0) {
      normal.x = -1
      normal.y = -1
    } else if (invdir.x > 0 && invdir.y > 0) {
      normal.x = 1
      normal.y = -1
    }
  }

  // collided with the object!
  return {
    normal,
    near: vec2.create(from.x + hitNear * dir.x, from.y + hitNear * dir.y),
    far: vec2.create(from.x + hitFar * dir.x, from.y + hitFar * dir.y),
    timeOfCollision: hitNear
  }
}

// a dynamic rect is one that can move - has a velocity
// static rect doesn't move
function dynamicRectVsStaticRect(dynamicRect, staticRect) {
  // assume no collision if the dynamic rect is not moving
  // avoiding using length here because it calculates a square root
  if (dynamicRect.velocity.x === 0 && dynamicRect.velocity.y === 0) {
    return false
  }

  const halfWidth = dynamicRect.width / 2
  const halfHeight = dynamicRect.height / 2

  const clone = vec2.clone(dynamicRect.position)

  clone.add(dynamicRect.velocity)
  clone.x += dynamicRect.width / 2
  clone.y += dynamicRect.height / 2

  const line = {
    from: {
      x: dynamicRect.position.x + halfWidth,
      y: dynamicRect.position.y + halfHeight
    },
    to: clone
  }

  const rect = {
    x: staticRect.position.x - halfWidth,
    y: staticRect.position.y - halfHeight,
    width: staticRect.width + dynamicRect.width,
    height: staticRect.height + dynamicRect.height
  }

  return lineVsRect(line, rect)
}

export default {
  dynamicRectVsStaticRect,
  rectVsRect,
  lineVsRect,
  pointVsRect
}
