const WIDTH = 800
const HEIGHT = 600
const LINE_WIDTH = 2
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
    const value = Math.random() * (range * 2 - deadZone * 2)

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

  velocity.multiplyScalar(speed[size] + Math.random() * 50)

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
      decay: 0.7 + Math.random() * 0.15
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
  position: Bramble.vec2.create(WIDTH / 2, HEIGHT /2),
  angle: 0,
  rotationSpeed: 150,
  velocity: 0,
  acceleration: 100
}

let bullets = []

let score = 0

let particles = []

game.setUpdate(({ dt, input }) => {
  // keyboard controls
  if (input.keyboard.left.pressed) {
    player.angle -= player.rotationSpeed * dt
  }

  if (input.keyboard.right.pressed) {
    player.angle += player.rotationSpeed * dt
  }

  if (input.keyboard.up.pressed) {
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


  if (input.keyboard.space.justPressed) {
    const angle = Bramble.vec2.degreesToRadians(player.angle + 90)

    const direction = Bramble.vec2.create(
      Math.cos(angle),
      Math.sin(angle)
    )

    direction.multiplyScalar(500)

    const position = Bramble.vec2.create(
      player.position.x,
      player.position.y - 12
    )

    bullets.push({
      position,
      previousPosition: position.clone(),
      velocity: direction
    })
  }

  // update the player position
  const angle = Bramble.vec2.degreesToRadians(player.angle + 90)

  const direction = Bramble.vec2.create(
    Math.cos(angle),
    Math.sin(angle)
  )

  direction.multiplyScalar(player.velocity * dt)
  player.position.add(direction)

  // insert particles
  if (player.velocity > 0) {
    const count = Math.floor(Math.random() * 3) + 1

    for (let i = 0; i < count; i++) {
      const variance = (Math.random() * 30) - 15

      // Position the thruster behind the ship
      const position = Bramble.vec2.create(
        player.position.x,
        player.position.y - 12
      )

      // Exhaust direction, with random spread
      const particleAngle = Bramble.vec2.degreesToRadians(
        player.angle - 90 + variance
      )

      const direction = Bramble.vec2.create(
        Math.cos(particleAngle),
        Math.sin(particleAngle)
      )

      direction.multiplyScalar(player.velocity * 5)

      particles.push({
        position,
        previousPosition: position.clone(),
        velocity: direction,
        decay: 0.7 + Math.random() * 0.15
      })
    }
  }


  // update the particles
  particles.forEach(particle => {
    particle.previousPosition = particle.position.clone()

    const movement = particle.velocity.clone()
    movement.multiplyScalar(dt)
    particle.position.add(movement)

    particle.velocity.multiplyScalar(particle.decay)
  })

  particles = particles.filter(particle =>
    (particle.position.x >= 0 &&
    particle.position.x <= WIDTH &&
    particle.position.y >= 0 &&
    particle.position.y <= HEIGHT) && particle.velocity.getLength() > 10
  )

  // update the asteroid ballistics
  asteroids.forEach(asteroid => {
    asteroid.x += asteroid.velocity.x * dt
    asteroid.y += asteroid.velocity.y * dt

    if (asteroid.x - (asteroid.size * 10) > WIDTH) {
      asteroid.x = -(asteroid.size * 10)
    }

    if (asteroid.x + (asteroid.size * 10) < 0) {
      asteroid.x = WIDTH + asteroid.size * 10
    }

    if (asteroid.y - (asteroid.size * 10) > HEIGHT) {
      asteroid.y = -(asteroid.size * 10)
    }

    if (asteroid.y + (asteroid.size * 10) < 0) {
      asteroid.y = HEIGHT + asteroid.size * 10
    }
  })

  // update the bullet ballistics
  bullets.forEach(bullet => {
    bullet.previousPosition = bullet.position.clone()

    const movement = bullet.velocity.clone()
    movement.multiplyScalar(dt)

    bullet.position.add(movement)
  })

  // remove bullets that are off screen
  bullets = bullets.filter(bullet =>
    bullet.position.x >= 0 &&
    bullet.position.x <= WIDTH &&
    bullet.position.y >= 0 &&
    bullet.position.y <= HEIGHT
  )

  // check for bullet/asteroid collisions
  const hitAsteroids = []

  bullets = bullets.filter(bullet => {
    const asteroid = asteroids.find(asteroid => {
      const dx = bullet.position.x - asteroid.x
      const dy = bullet.position.y - asteroid.y
      const distance = Math.sqrt(dx * dx + dy * dy)

      return distance <= asteroid.size * 10
    })

    if (asteroid) {
      hitAsteroids.push(asteroid)
      return false
    }

    return true
  })

  // break hit asteroids
  hitAsteroids.forEach(asteroid => {
    createExplosion(asteroid)

    const children = breakAsteroid(asteroid)
    asteroids.splice(asteroids.indexOf(asteroid), 1)
    asteroids.push(...children)
    score += asteroid.size
  })
})

game.setRender(({ gfx }) => {
  gfx.clear('black')

  gfx.strokeGlow(() => {
    // draw all of the asteroids
    asteroids.forEach(asteroid => {
      gfx.circle({ x: asteroid.x, y: asteroid.y }, asteroid.size * 10, {
        line: { colour: 'white', width: LINE_WIDTH },
        fill: { opacity: 0 }
      })
    })

    // draw the particles
    particles.forEach(particle => {
      gfx.line(
        particle.position,
        particle.previousPosition,
        { width: LINE_WIDTH }
      )
    })

    // draw the player
    gfx.rotate(() => {
      gfx.line(player.position, {
        x: player.position.x - 10,
        y: player.position.y - 24
      }, { width: 2 })

      gfx.line(player.position, {
        x: player.position.x + 10,
        y: player.position.y - 24
      }, { width: 2 })

      gfx.line({
        x: player.position.x - 10,
        y: player.position.y - 24
      }, {
        x: player.position.x,
        y: player.position.y - 20
      }, { width: 2 })

      gfx.line({
        x: player.position.x,
        y: player.position.y - 20
      }, {
        x: player.position.x + 10,
        y: player.position.y - 24
      }, { width: 2 })
    }, player.angle, {
      x: player.position.x,
      y: player.position.y - 12
    })

    // draw the bullets
    bullets.forEach(bullet => {
      gfx.line(bullet.position, bullet.previousPosition, { width: LINE_WIDTH * 2 })
    })

    // draw the border around the play field
    gfx.rect({ x: 10, y: 10, width: WIDTH - 20, height: HEIGHT - 20 }, {
      fill: { opacity: 0 },
      line: { colour: 'white', width: LINE_WIDTH }
    })

    // draw the HUD
    gfx.text({ x: 24, y: 24 }, `SCORE: ${score}`, {
      colour: 'white',
      size: '24px',
      family: 'monospace'
    })

    gfx.text({ x: 24, y: HEIGHT - 36 }, `Controls: LEFT and RIGHT to aim, UP to move and SPACE to shoot`, {
      colour: 'white',
      size: '16px',
      family: 'monospace'
    })
  }, { blur: 8, colour: 'white' })
})

game.start()
