const WIDTH = 800

const HEIGHT = 600

const LINE_WIDTH = 2

const COLOUR = 'white'

const GLOW = 0

const game = Bramble.game.create()

const container = document.getElementById('bramble-container')

game.attachTo(container)

game.setSize(WIDTH, HEIGHT)

const spawnAsteroid = (size, position = {
  x: Math.random() * WIDTH,
  y: Math.random() * HEIGHT
}) => {

  const range = size * 10
  const deadZone = size * 5

  const randomOffset = () => {

    const value =
      Math.random() * (range * 2 - deadZone * 2)

    return value < range - deadZone
      ? value - range
      : value + deadZone
  }

  const x = position.x + randomOffset()
  const y = position.y + randomOffset()

  const velocity = Bramble.vec2.create(
    x - position.x,
    y - position.y
  )

  velocity.normalise()

  const speed = {
    1: 100,
    3: 50,
    5: 25
  }

  velocity.multiplyScalar(
    speed[size] + Math.random() * 50
  )

  return {
    x,
    y,
    size,
    velocity
  }
}

const breakAsteroid = (asteroid) => {

  if (asteroid.size === 5) {

    return [
      spawnAsteroid(3, asteroid),
      spawnAsteroid(3, asteroid)
    ]
  }

  if (asteroid.size === 3) {

    return [
      spawnAsteroid(1, asteroid),
      spawnAsteroid(1, asteroid),
      spawnAsteroid(1, asteroid)
    ]
  }

  return []
}

const createExplosion = (asteroid) => {

  const count = asteroid.size

  for (let i = 0; i < count * 3; i++) {

    const angle = Math.random() * Math.PI * 2

    const direction = Bramble.vec2.create(
      Math.cos(angle),
      Math.sin(angle)
    )

    direction.multiplyScalar(
      100 + Math.random() * asteroid.size * 150
    )

    const position = Bramble.vec2.create(
      asteroid.x,
      asteroid.y
    )

    particles.push({
      position,
      previousPosition: position.clone(),
      velocity: direction,
      decay: 0.7 + Math.random() * 0.15,
    })
  }
}

const createImpactParticles = (position, bulletVelocity) => {

  const count = Math.floor(Math.random() * 6) + 5

  for (let i = 0; i < count; i++) {

    const variance = (Math.random() * 120) - 60

    const bulletAngle = Math.atan2(
      bulletVelocity.y,
      bulletVelocity.x
    ) + Math.PI

    const particleAngle =
      bulletAngle +
      Bramble.vec2.degreesToRadians(variance)

    const direction = Bramble.vec2.create(
      Math.cos(particleAngle),
      Math.sin(particleAngle)
    )

    direction.multiplyScalar(
      150 + Math.random() * 250
    )

    const impactVelocity = bulletVelocity.clone()

    impactVelocity.multiplyScalar(0.15)

    direction.add(impactVelocity)

    particles.push({
      position: position.clone(),
      previousPosition: position.clone(),
      velocity: direction,
      decay: 0.7 + Math.random() * 0.15,
      colour: COLOUR
    })
  }
}

const asteroids = [
  spawnAsteroid(5),
  spawnAsteroid(5),
  spawnAsteroid(5),
  spawnAsteroid(5),
  spawnAsteroid(5)
]

const player = {
  position: Bramble.vec2.create(
    WIDTH / 2,
    HEIGHT / 2
  ),
  angle: 0,
  rotationSpeed: 150,
  velocity: 0,
  acceleration: 100,
  shield: false,
}

let bullets = []

let score = 0

let particles = []

let bombRadius = 0

const bombRadiusMax = 150
const bombRadiusVisualMax = 160
const bombRadiusSpeed = 150

game.setUpdate(({ dt, input }) => {

  // keyboard controls

  if (
    input.keyboard.left.pressed ||
    input.keyboard.A.pressed
  ) {
    player.angle -= player.rotationSpeed * dt
  }

  if (
    input.keyboard.right.pressed ||
    input.keyboard.D.pressed
  ) {
    player.angle += player.rotationSpeed * dt
  }

  if (
    input.keyboard.up.pressed ||
    input.keyboard.W.pressed
  ) {
    player.velocity += player.acceleration * dt
  } else {
    player.velocity -= player.acceleration * dt
  }

  if (player.velocity > 250) {
    player.velocity = 250
  }

  if (player.velocity < 0) {
    player.velocity = 0
  }

  // update the player position

  const angle = Bramble.vec2.degreesToRadians(
    player.angle + 90
  )

  const direction = Bramble.vec2.create(
    Math.cos(angle),
    Math.sin(angle)
  )

  direction.multiplyScalar(
    player.velocity * dt
  )

  player.position.add(direction)

  // wrap the player around the screen

  if (player.position.x > WIDTH + 24) {
    player.position.x = -24
  }

  if (player.position.x < -24) {
    player.position.x = WIDTH + 24
  }

  if (player.position.y > HEIGHT + 24) {
    player.position.y = -24
  }

  if (player.position.y < -24) {
    player.position.y = HEIGHT + 24
  }

  // bomb
  if (input.keyboard.space.justPressed) {

    bombRadius = bombRadiusMax

    const newAsteroids = []

    asteroids.forEach(asteroid => {

      // Find the shortest distance across the wrapped screen

      let dx = asteroid.x - player.position.x
      let dy = asteroid.y - player.position.y

      if (dx > WIDTH / 2) {
        dx -= WIDTH
      }

      if (dx < -WIDTH / 2) {
        dx += WIDTH
      }

      if (dy > HEIGHT / 2) {
        dy -= HEIGHT
      }

      if (dy < -HEIGHT / 2) {
        dy += HEIGHT
      }

      const distance =
        Math.sqrt(dx * dx + dy * dy)

      const asteroidRadius =
        asteroid.size * 10

      // Circle-to-circle collision

      if (
        distance <=
        bombRadiusMax + asteroidRadius
      ) {

        createExplosion(asteroid)

        const children =
          breakAsteroid(asteroid)

        newAsteroids.push(...children)

        score += asteroid.size

      } else {

        newAsteroids.push(asteroid)
      }
    })

    asteroids.length = 0

    asteroids.push(...newAsteroids)
  }

  // grow the bomb radius visually

  if (bombRadius > 0) {

    bombRadius += bombRadiusSpeed * dt

    if (
      bombRadius >=
      bombRadiusVisualMax
    ) {
      bombRadius = 0
    }
  }

  // shield

  if (input.keyboard.X.pressed) {
    player.shield = true
  } else {
    player.shield = false
  }

  // shooting

  if (input.keyboard.Z.justPressed) {

    const angle =
      Bramble.vec2.degreesToRadians(
        player.angle + 90
      )

    const direction = Bramble.vec2.create(
      Math.cos(angle),
      Math.sin(angle)
    )

    direction.multiplyScalar(500)

    const radians =
      Bramble.vec2.degreesToRadians(
        player.angle
      )

    const tip = Bramble.vec2.create(
      player.position.x -
        Math.sin(radians) * 12,

      player.position.y -
        12 +
        Math.cos(radians) * 12
    )

    bullets.push({
      position: tip.clone(),
      previousPosition: tip.clone(),
      velocity: direction,
      lifetime: 1.25
    })

    // firing particles

    const count =
      Math.floor(Math.random() * 10) + 1

    for (let i = 0; i < count; i++) {

      const variance =
        (Math.random() * 120) - 60

      const particleAngle =
        Bramble.vec2.degreesToRadians(
          player.angle + 90 + variance
        )

      const particleDirection =
        Bramble.vec2.create(
          Math.cos(particleAngle),
          Math.sin(particleAngle)
        )

      particleDirection.multiplyScalar(
        250 + Math.random() * 150
      )

      // add the ship's actual movement velocity

      const shipAngle =
        Bramble.vec2.degreesToRadians(
          player.angle + 90
        )

      const shipVelocity =
        Bramble.vec2.create(
          Math.cos(shipAngle),
          Math.sin(shipAngle)
        )

      shipVelocity.multiplyScalar(
        player.velocity
      )

      particleDirection.add(shipVelocity)

      particles.push({
        position: tip.clone(),
        previousPosition: tip.clone(),
        velocity: particleDirection,
        decay: 0.7 + Math.random() * 0.15,
      })
    }
  }

  // insert particles

  if (player.velocity > 0) {

    const count =
      Math.floor(Math.random() * 3) + 1

    for (let i = 0; i < count; i++) {

      const variance =
        (Math.random() * 30) - 15

      // position the thruster behind the ship

      const position = Bramble.vec2.create(
        player.position.x,
        player.position.y - 12
      )

      // exhaust direction

      const particleAngle =
        Bramble.vec2.degreesToRadians(
          player.angle - 90 + variance
        )

      const direction =
        Bramble.vec2.create(
          Math.cos(particleAngle),
          Math.sin(particleAngle)
        )

      direction.multiplyScalar(
        player.velocity * 5
      )

      particles.push({
        position,
        previousPosition: position.clone(),
        velocity: direction,
        decay: 0.7 + Math.random() * 0.15,
      })
    }
  }

  // update the particles

  particles.forEach(particle => {

    particle.previousPosition =
      particle.position.clone()

    const movement =
      particle.velocity.clone()

    movement.multiplyScalar(dt)

    particle.position.add(movement)

    particle.velocity.multiplyScalar(
      particle.decay
    )

    let wrapped = false

    if (particle.position.x > WIDTH) {
      particle.position.x = 0
      wrapped = true
    }

    if (particle.position.x < 0) {
      particle.position.x = WIDTH
      wrapped = true
    }

    if (particle.position.y > HEIGHT) {
      particle.position.y = 0
      wrapped = true
    }

    if (particle.position.y < 0) {
      particle.position.y = HEIGHT
      wrapped = true
    }

    if (wrapped) {
      particle.previousPosition =
        particle.position
    }
  })

  particles = particles.filter(particle =>
    particle.velocity.getLength() > 10
  )

  // update the asteroid ballistics

  asteroids.forEach(asteroid => {

    asteroid.x += asteroid.velocity.x * dt
    asteroid.y += asteroid.velocity.y * dt

    if (
      asteroid.x -
      (asteroid.size * 10) >
      WIDTH
    ) {
      asteroid.x =
        -(asteroid.size * 10)
    }

    if (
      asteroid.x +
      (asteroid.size * 10) <
      0
    ) {
      asteroid.x =
        WIDTH + asteroid.size * 10
    }

    if (
      asteroid.y -
      (asteroid.size * 10) >
      HEIGHT
    ) {
      asteroid.y =
        -(asteroid.size * 10)
    }

    if (
      asteroid.y +
      (asteroid.size * 10) <
      0
    ) {
      asteroid.y =
        HEIGHT + asteroid.size * 10
    }
  })

  const brokenAsteroids = new Set()

  // collide the asteroids

  for (
    let i = 0;
    i < asteroids.length;
    i++
  ) {

    for (
      let j = i + 1;
      j < asteroids.length;
      j++
    ) {

      const a = asteroids[i]
      const b = asteroids[j]

      const dx = b.x - a.x
      const dy = b.y - a.y

      const distance =
        Math.sqrt(dx * dx + dy * dy)

      const minDistance =
        (a.size + b.size) * 10

      if (
        distance < minDistance &&
        distance > 0
      ) {

        const nx = dx / distance
        const ny = dy / distance

        const relativeVelocityX =
          b.velocity.x - a.velocity.x

        const relativeVelocityY =
          b.velocity.y - a.velocity.y

        const velocityAlongNormal =
          relativeVelocityX * nx +
          relativeVelocityY * ny

        // already moving apart

        if (velocityAlongNormal > 0) {
          continue
        }

        const massA = a.size
        const massB = b.size

        const impulse =
          (2 * velocityAlongNormal) /
          (massA + massB)

        a.velocity.x +=
          impulse * massB * nx

        a.velocity.y +=
          impulse * massB * ny

        b.velocity.x -=
          impulse * massA * nx

        b.velocity.y -=
          impulse * massA * ny

        // separate overlapping asteroids

        const overlap =
          minDistance - distance

        const separationX =
          nx * overlap / 2

        const separationY =
          ny * overlap / 2

        a.x -= separationX
        a.y -= separationY

        b.x += separationX
        b.y += separationY

        // add particles

        const impactX =
          a.x + nx * (a.size * 10)

        const impactY =
          a.y + ny * (a.size * 10)

        const impactPosition =
          Bramble.vec2.create(
            impactX,
            impactY
          )

        createImpactParticles(
          impactPosition,
          Bramble.vec2.create(
            relativeVelocityX,
            relativeVelocityY
          )
        )

        // chance for the larger asteroid
        // to break the smaller asteroid

        const large =
          a.size > b.size ? a : b

        const small =
          a.size > b.size ? b : a

        const breakChance = {
          5: 0.10,
          3: 0.05,
          1: 0
        }

        if (
          Math.random() <
          breakChance[large.size]
        ) {
          brokenAsteroids.add(small)
        }
      }
    }
  }

  // break asteroids damaged by collisions

  brokenAsteroids.forEach(asteroid => {

    const children =
      breakAsteroid(asteroid)

    const index =
      asteroids.indexOf(asteroid)

    if (index !== -1) {

      asteroids.splice(index, 1)

      asteroids.push(...children)
    }
  })

  // update the bullet ballistics

  bullets.forEach(bullet => {

    bullet.previousPosition =
      bullet.position.clone()

    const movement =
      bullet.velocity.clone()

    movement.multiplyScalar(dt)

    bullet.position.add(movement)

    bullet.lifetime -= dt

    let wrapped = false

    if (bullet.position.x > WIDTH) {
      bullet.position.x = 0
      wrapped = true
    }

    if (bullet.position.x < 0) {
      bullet.position.x = WIDTH
      wrapped = true
    }

    if (bullet.position.y > HEIGHT) {
      bullet.position.y = 0
      wrapped = true
    }

    if (bullet.position.y < 0) {
      bullet.position.y = HEIGHT
      wrapped = true
    }

    if (wrapped) {
      bullet.previousPosition =
        bullet.position
    }
  })

  // remove bullets whose lifetime has expired

  bullets = bullets.filter(bullet =>
    bullet.lifetime > 0
  )

  // check for bullet/asteroid collisions

  const hitAsteroids = []

  bullets = bullets.filter(bullet => {

    const asteroid =
      asteroids.find(asteroid => {

        const dx =
          bullet.position.x - asteroid.x

        const dy =
          bullet.position.y - asteroid.y

        const distance =
          Math.sqrt(dx * dx + dy * dy)

        return distance <= asteroid.size * 10
      })

    if (asteroid) {

      hitAsteroids.push(asteroid)

      // createImpactParticles(
      //   bullet.position,
      //   bullet.velocity
      // )

      return false
    }

    return true
  })

  // break hit asteroids

  hitAsteroids.forEach(asteroid => {

    createExplosion(asteroid)

    const children =
      breakAsteroid(asteroid)

    asteroids.splice(
      asteroids.indexOf(asteroid),
      1
    )

    asteroids.push(...children)

    score += asteroid.size
  })
})

const drawWrappedBomb = (gfx, position, radius) => {

  const offsets = [-1, 0, 1]

  offsets.forEach(xOffset => {
    offsets.forEach(yOffset => {

      gfx.circle(
        {
          x: position.x + xOffset * WIDTH,
          y: position.y + yOffset * HEIGHT
        },
        radius,
        {
          line: {
            colour: COLOUR,
            width: 2
          },
          fill: {
            colour: COLOUR,
            opacity: 1
          }
        }
      )
    })
  })
}

game.setRender(({ gfx }) => {

  gfx.clear('black')

  gfx.strokeGlow(() => {

    // draw all of the asteroids

    asteroids.forEach(asteroid => {

      gfx.circle(
        {
          x: asteroid.x,
          y: asteroid.y
        },
        asteroid.size * 10,
        {
          line: {
            colour: COLOUR,
            width: LINE_WIDTH
          },
          fill: {
            opacity: 0
          }
        }
      )
    })

    // draw the particles

    particles.forEach(particle => {

      gfx.line(
        particle.position,
        particle.previousPosition,
        {
          width: LINE_WIDTH,
          colour:
            particle.colour ?? COLOUR
        }
      )
    })

    // draw the player

    gfx.rotate(() => {

      gfx.line(
        player.position,
        {
          x: player.position.x - 10,
          y: player.position.y - 24
        },
        {
          width: 2,
          colour: COLOUR
        }
      )

      gfx.line(
        player.position,
        {
          x: player.position.x + 10,
          y: player.position.y - 24
        },
        {
          width: 2,
          colour: COLOUR
        }
      )

      gfx.line(
        {
          x: player.position.x - 10,
          y: player.position.y - 24
        },
        {
          x: player.position.x,
          y: player.position.y - 20
        },
        {
          width: 2,
          colour: COLOUR
        }
      )

      gfx.line(
        {
          x: player.position.x,
          y: player.position.y - 20
        },
        {
          x: player.position.x + 10,
          y: player.position.y - 24
        },
        {
          width: 2,
          colour: COLOUR
        }
      )

    }, player.angle, {
      x: player.position.x,
      y: player.position.y - 12
    })

    // draw the shield

    if (player.shield) {

      gfx.circle(
        {
          x: player.position.x,
          y: player.position.y - 14
        },
        16,
        {
          line: {
            width: 2,
            colour: 'white'
          },
          fill: {
            opacity: 0
          }
        }
      )
    }

    // draw the bomb

    if (bombRadius > 0) {
      drawWrappedBomb(
        gfx,
        player.position,
        bombRadius
      )
    }

    // draw the bullets

    bullets.forEach(bullet => {

      gfx.line(
        bullet.position,
        bullet.previousPosition,
        {
          width: LINE_WIDTH * 2,
          colour: COLOUR
        }
      )
    })

    // draw the border

    gfx.rect(
      {
        x: 10,
        y: 10,
        width: WIDTH - 20,
        height: HEIGHT - 20
      },
      {
        fill: {
          opacity: 0
        },
        line: {
          colour: COLOUR,
          width: LINE_WIDTH
        }
      }
    )

    // draw the HUD

    gfx.text(
      {
        x: 24,
        y: 24
      },
      `SCORE: ${score}`,
      {
        colour: COLOUR,
        size: '24px',
        family: 'monospace'
      }
    )

    gfx.text(
      {
        x: 24,
        y: HEIGHT - 36
      },
      `Controls: LEFT/A and RIGHT/D to aim, UP/W to move, Z to shoot, SPACE to bomb, X for shield`,
      {
        colour: COLOUR,
        size: '16px',
        family: 'monospace'
      }
    )

  }, {
    blur: 8,
    colour: COLOUR
  })
})

game.start()
