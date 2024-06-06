import { LineVsCubicBezierCurveIntersection, Vec2 } from './types'
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

// Compute the value of a point on a cubic Bezier curve at parameter t
function cubicBezierPoint(
  P0: Vec2,
  P1: Vec2,
  P2: Vec2,
  P3: Vec2,
  t: number
): Vec2 {
  const x =
    (1 - t) * (1 - t) * (1 - t) * P0.x +
    3 * (1 - t) * (1 - t) * t * P1.x +
    3 * (1 - t) * t * t * P2.x +
    t * t * t * P3.x
  const y =
    (1 - t) * (1 - t) * (1 - t) * P0.y +
    3 * (1 - t) * (1 - t) * t * P1.y +
    3 * (1 - t) * t * t * P2.y +
    t * t * t * P3.y
  return vec2.create(x, y)
}

// Compute the tangent of the curve at parameter t
function cubicBezierTangent(
  P0: Vec2,
  P1: Vec2,
  P2: Vec2,
  P3: Vec2,
  t: number
): Vec2 {
  const x =
    3 * (1 - t) * (1 - t) * (P1.x - P0.x) +
    6 * (1 - t) * t * (P2.x - P1.x) +
    3 * t * t * (P3.x - P2.x)
  const y =
    3 * (1 - t) * (1 - t) * (P1.y - P0.y) +
    6 * (1 - t) * t * (P2.y - P1.y) +
    3 * t * t * (P3.y - P2.y)
  return vec2.create(x, y)
}

// Helper function to find the roots of a cubic polynomial using Cardano's formula
function findCubicRoots(A: number, B: number, C: number, D: number): number[] {
  if (Math.abs(A) < 1e-10) {
    return findQuadraticRoots(B, C, D)
  }

  const a = B / A
  const b = C / A
  const c = D / A
  const p = (3 * b - a * a) / 3
  const q = (2 * a * a * a - 9 * a * b + 27 * c) / 27
  const discriminant = (q * q) / 4 + (p * p * p) / 27

  const roots: number[] = []

  if (discriminant > 0) {
    const u = Math.cbrt(-q / 2 + Math.sqrt(discriminant))
    const v = Math.cbrt(-q / 2 - Math.sqrt(discriminant))
    roots.push(u + v - a / 3)
  } else if (discriminant === 0) {
    const u = Math.cbrt(-q / 2)
    roots.push(2 * u - a / 3)
    roots.push(-u - a / 3)
  } else {
    const r = Math.sqrt((-p * p * p) / 27)
    const phi = Math.acos(-q / (2 * r))
    roots.push(2 * Math.cbrt(r) * Math.cos(phi / 3) - a / 3)
    roots.push(2 * Math.cbrt(r) * Math.cos((phi + 2 * Math.PI) / 3) - a / 3)
    roots.push(2 * Math.cbrt(r) * Math.cos((phi + 4 * Math.PI) / 3) - a / 3)
  }

  return roots.filter(t => t >= 0 && t <= 1)
}

// Helper function to find the roots of a quadratic polynomial
function findQuadraticRoots(A: number, B: number, C: number): number[] {
  const discriminant = B * B - 4 * A * C
  if (discriminant < 0) {
    return []
  } else if (discriminant === 0) {
    return [-B / (2 * A)]
  } else {
    const sqrtDiscriminant = Math.sqrt(discriminant)
    return [
      (-B + sqrtDiscriminant) / (2 * A),
      (-B - sqrtDiscriminant) / (2 * A)
    ]
  }
}

// Find intersection between a ray (defined by two points) and a cubic Bezier curve
function lineVsCubicBezierCurve(
  P0: Vec2,
  P1: Vec2,
  P2: Vec2,
  P3: Vec2,
  R0: Vec2,
  R1: Vec2
): LineVsCubicBezierCurveIntersection[] {
  const intersections: LineVsCubicBezierCurveIntersection[] = []

  // Coefficients of the cubic Bezier curve
  const ax = -P0.x + 3 * P1.x - 3 * P2.x + P3.x
  const ay = -P0.y + 3 * P1.y - 3 * P2.y + P3.y
  const bx = 3 * P0.x - 6 * P1.x + 3 * P2.x
  const by = 3 * P0.y - 6 * P1.y + 3 * P2.y
  const cx = -3 * P0.x + 3 * P1.x
  const cy = -3 * P0.y + 3 * P1.y
  const dx = P0.x
  const dy = P0.y

  // Coefficients of the ray
  const rx = R1.x - R0.x
  const ry = R1.y - R0.y
  const ex = R0.x
  const ey = R0.y

  // Construct the cubic equation: At^3 + Bt^2 + Ct + D = 0
  const A = ax * ry - ay * rx
  const B = bx * ry - by * rx
  const C = cx * ry - cy * rx
  const D = (dx - ex) * ry - (dy - ey) * rx

  const roots = findCubicRoots(A, B, C, D)

  // Check valid t values and compute intersections
  roots.forEach(t => {
    const intersection = cubicBezierPoint(P0, P1, P2, P3, t)
    const tangent = cubicBezierTangent(P0, P1, P2, P3, t)
    const angleRadians = Math.atan2(tangent.y, tangent.x)
    const angleDegrees = angleRadians * (180 / Math.PI)

    const tempvec = vec2.fromDegrees(angleDegrees)
    const normal = vec2.create(tempvec.y, -tempvec.x)

    // Calculate the distance along the ray
    const dx = intersection.x - R0.x
    const dy = intersection.y - R0.y
    const distanceToIntersection = Math.sqrt(dx * dx + dy * dy)
    const rayLength = Math.sqrt(rx * rx + ry * ry)
    const remainderLength = rayLength - distanceToIntersection

    // Ensure the intersection point lies within the ray segment
    const rayParam = (intersection.x - ex) / rx
    const rayParamY = (intersection.y - ey) / ry
    if (
      (rayParam >= 0 && rayParam <= 1) ||
      (rayParamY >= 0 && rayParamY <= 1)
    ) {
      intersections.push({
        point: vec2.create(intersection.x, intersection.y),
        distance: distanceToIntersection,
        remainderLength,
        angleRadians,
        angleDegrees,
        direction: vec2.fromDegrees(angleDegrees),
        normal
      })
    }
  })

  return intersections
}

export default {
  dynamicRectVsStaticRect,
  rectVsRect,
  lineVsRect,
  pointVsRect,
  lineVsCubicBezierCurve
}
