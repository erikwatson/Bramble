import {
  game as BrambleGame,
  vec2,
  type UpdateCallbackOptions,
  type RenderCallbackOptions,
  type Vec2,
} from "@erikwatson/bramble";

import {
  type Asteroid,
  type AsteroidSize,
  type Player,
  type Bullet,
  type Particle,
} from "./types";

import { COLOUR, GLOW, HEIGHT, WIDTH } from "./constants";
import { breakAsteroid, spawnAsteroid } from "./functions";
import { drawAsteroids, drawParticles, drawPlayer, drawShield, drawBomb, drawBullets, drawHUD } from "./renderer";

// setup
const game = BrambleGame.create();

const container = document.getElementById("bramble-container");
game.attachTo(container!);
game.setSize(WIDTH, HEIGHT);

// load the assets
await game.assets.add("shoot", "sound", "/assets/shoot.wav");
await game.assets.add("break", "sound", "/assets/boom.wav");
await game.assets.add("hit", "sound", "/assets/hit.wav");
await game.assets.add("grow", "sound", "/assets/grow.wav");

// particle functions
let particles: Particle[] = [];
const createExplosion = (asteroid: Asteroid): void => {
  const count = asteroid.size;

  for (let i = 0; i < count * 3; i++) {
    const angle = Math.random() * Math.PI * 2;

    const direction = vec2.create(Math.cos(angle), Math.sin(angle));

    direction.multiplyScalar(100 + Math.random() * asteroid.size * 150);

    const position = vec2.create(asteroid.x, asteroid.y);

    particles.push({
      position,
      previousPosition: vec2.clone(position),
      velocity: direction,
      decay: 0.7 + Math.random() * 0.15,
    });
  }
};

const createImpactParticles = (position: Vec2, bulletVelocity: Vec2): void => {
  const count = Math.floor(Math.random() * 6) + 5;

  for (let i = 0; i < count; i++) {
    const variance = Math.random() * 120 - 60;
    const bulletAngle =
      Math.atan2(bulletVelocity.y, bulletVelocity.x) + Math.PI;
    const particleAngle = bulletAngle + vec2.degreesToRadians(variance);
    const direction = vec2.create(
      Math.cos(particleAngle),
      Math.sin(particleAngle),
    );
    direction.multiplyScalar(150 + Math.random() * 250);

    const impactVelocity = vec2.clone(bulletVelocity);
    impactVelocity.multiplyScalar(0.15);
    direction.add(impactVelocity);

    particles.push({
      position: vec2.clone(position),
      previousPosition: vec2.clone(position),
      velocity: direction,
      decay: 0.7 + Math.random() * 0.15,
      colour: COLOUR,
    });
  }
};

const asteroids: Asteroid[] = [
  spawnAsteroid(5),
  spawnAsteroid(5),
  spawnAsteroid(5),
  spawnAsteroid(3),
  spawnAsteroid(3),
  spawnAsteroid(3),
  spawnAsteroid(1),
  spawnAsteroid(1),
  spawnAsteroid(1),
];

const player: Player = {
  position: vec2.create(WIDTH / 2, HEIGHT / 2),
  angle: 0,
  rotationSpeed: 150,
  velocity: 0,
  acceleration: 100,
  shield: false,
};

let bullets: Bullet[] = [];
let score = 0;
let bombRadius = 0;
const bombRadiusMax = 150;
const bombRadiusVisualMax = 160;
const bombRadiusSpeed = 150;

game.setUpdate(({ dt, input, sfx }: UpdateCallbackOptions) => {
  // keyboard controls
  if (input.keyboard.left.pressed || input.keyboard.A.pressed) {
    player.angle -= player.rotationSpeed * dt;
  }

  if (input.keyboard.right.pressed || input.keyboard.D.pressed) {
    player.angle += player.rotationSpeed * dt;
  }

  if (input.keyboard.up.pressed || input.keyboard.W.pressed) {
    player.velocity += player.acceleration * dt;
  } else {
    player.velocity -= player.acceleration * dt;
  }

  if (player.velocity > 250) {
    player.velocity = 250;
  }

  if (player.velocity < 0) {
    player.velocity = 0;
  }

  // update the player position
  const angle = vec2.degreesToRadians(player.angle + 90);

  const direction = vec2.create(Math.cos(angle), Math.sin(angle));

  direction.multiplyScalar(player.velocity * dt);

  player.position.add(direction);

  // wrap the player around the screen
  if (player.position.x > WIDTH + 24) {
    player.position.x = -24;
  }

  if (player.position.x < -24) {
    player.position.x = WIDTH + 24;
  }

  if (player.position.y > HEIGHT + 24) {
    player.position.y = -24;
  }

  if (player.position.y < -24) {
    player.position.y = HEIGHT + 24;
  }

  // bomb
  if (input.keyboard.space.justPressed) {
    bombRadius = bombRadiusMax;

    const newAsteroids: Asteroid[] = [];

    asteroids.forEach((asteroid) => {
      // Find the shortest distance across
      // the wrapped screen
      let dx = asteroid.x - player.position.x;

      let dy = asteroid.y - player.position.y;

      if (dx > WIDTH / 2) {
        dx -= WIDTH;
      }

      if (dx < -WIDTH / 2) {
        dx += WIDTH;
      }

      if (dy > HEIGHT / 2) {
        dy -= HEIGHT;
      }

      if (dy < -HEIGHT / 2) {
        dy += HEIGHT;
      }

      const distance = Math.sqrt(dx * dx + dy * dy);

      const asteroidRadius = asteroid.size * 10;

      // Circle-to-circle collision
      if (distance <= bombRadiusMax + asteroidRadius) {
        createExplosion(asteroid);

        const children = breakAsteroid(asteroid);

        sfx.play("break");

        newAsteroids.push(...children);

        score += asteroid.size;
      } else {
        newAsteroids.push(asteroid);
      }
    });

    asteroids.length = 0;
    asteroids.push(...newAsteroids);
  }

  // grow the bomb radius visually
  if (bombRadius > 0) {
    bombRadius += bombRadiusSpeed * dt;

    if (bombRadius >= bombRadiusVisualMax) {
      bombRadius = 0;
    }
  }

  // shield
  if (input.keyboard.X.pressed) {
    player.shield = true;
  } else {
    player.shield = false;
  }

  // shooting
  if (input.keyboard.Z.justPressed) {
    sfx.play("shoot");

    const angle = vec2.degreesToRadians(player.angle + 90);

    const direction = vec2.create(Math.cos(angle), Math.sin(angle));

    direction.multiplyScalar(500);

    const radians = vec2.degreesToRadians(player.angle);

    const tip = vec2.create(
      player.position.x - Math.sin(radians) * 12,

      player.position.y - 12 + Math.cos(radians) * 12,
    );

    bullets.push({
      position: vec2.clone(tip),
      previousPosition: vec2.clone(tip),
      velocity: direction,
      lifetime: 1.25,
    });

    // firing particles
    const count = Math.floor(Math.random() * 10) + 1;

    for (let i = 0; i < count; i++) {
      const variance = Math.random() * 120 - 60;

      const particleAngle = vec2.degreesToRadians(player.angle + 90 + variance);

      const particleDirection = vec2.create(
        Math.cos(particleAngle),
        Math.sin(particleAngle),
      );

      particleDirection.multiplyScalar(250 + Math.random() * 150);

      // add the ship's actual movement velocity
      const shipAngle = vec2.degreesToRadians(player.angle + 90);

      const shipVelocity = vec2.create(
        Math.cos(shipAngle),
        Math.sin(shipAngle),
      );

      shipVelocity.multiplyScalar(player.velocity);

      particleDirection.add(shipVelocity);

      particles.push({
        position: vec2.clone(tip),
        previousPosition: vec2.clone(tip),
        velocity: particleDirection,
        decay: 0.7 + Math.random() * 0.15,
      });
    }
  }

  // insert particles
  if (player.velocity > 0) {
    const count = Math.floor(Math.random() * 3) + 1;

    for (let i = 0; i < count; i++) {
      const variance = Math.random() * 30 - 15;

      // position the thruster behind the ship
      const position = vec2.create(player.position.x, player.position.y - 12);

      // exhaust direction
      const particleAngle = vec2.degreesToRadians(player.angle - 90 + variance);

      const direction = vec2.create(
        Math.cos(particleAngle),
        Math.sin(particleAngle),
      );

      direction.multiplyScalar(player.velocity * 5);

      particles.push({
        position,
        previousPosition: vec2.clone(position),
        velocity: direction,
        decay: 0.7 + Math.random() * 0.15,
      });
    }
  }

  // update the particles
  particles.forEach((particle) => {
    particle.previousPosition = vec2.clone(particle.position);

    const movement = vec2.clone(particle.velocity);

    movement.multiplyScalar(dt);

    particle.position.add(movement);

    particle.velocity.multiplyScalar(particle.decay);

    let wrapped = false;

    if (particle.position.x > WIDTH) {
      particle.position.x = 0;
      wrapped = true;
    }

    if (particle.position.x < 0) {
      particle.position.x = WIDTH;
      wrapped = true;
    }

    if (particle.position.y > HEIGHT) {
      particle.position.y = 0;
      wrapped = true;
    }

    if (particle.position.y < 0) {
      particle.position.y = HEIGHT;
      wrapped = true;
    }

    if (wrapped) {
      particle.previousPosition = vec2.clone(particle.position);
    }
  });

  particles = particles.filter(
    (particle) => particle.velocity.getLength() > 10,
  );

  // update the asteroid ballistics
  asteroids.forEach((asteroid) => {
    asteroid.x += asteroid.velocity.x * dt;

    asteroid.y += asteroid.velocity.y * dt;

    if (asteroid.x - asteroid.size * 10 > WIDTH) {
      asteroid.x = -(asteroid.size * 10);
    }

    if (asteroid.x + asteroid.size * 10 < 0) {
      asteroid.x = WIDTH + asteroid.size * 10;
    }

    if (asteroid.y - asteroid.size * 10 > HEIGHT) {
      asteroid.y = -(asteroid.size * 10);
    }

    if (asteroid.y + asteroid.size * 10 < 0) {
      asteroid.y = HEIGHT + asteroid.size * 10;
    }
  });

  const brokenAsteroids = new Set<Asteroid>();

  const removedAsteroids = new Set<Asteroid>();

  const combinedAsteroids: Asteroid[] = [];

  // collide the asteroids
  for (let i = 0; i < asteroids.length; i++) {
    for (let j = i + 1; j < asteroids.length; j++) {
      const a = asteroids[i];
      const b = asteroids[j];

      // Skip asteroids that have already
      // been marked for removal.
      if (
        removedAsteroids.has(a) ||
        removedAsteroids.has(b) ||
        brokenAsteroids.has(a) ||
        brokenAsteroids.has(b)
      ) {
        continue;
      }

      const dx = b.x - a.x;
      const dy = b.y - a.y;

      const distance = Math.sqrt(dx * dx + dy * dy);

      const minDistance = (a.size + b.size) * 10;

      if (distance < minDistance && distance > 0) {
        const nx = dx / distance;
        const ny = dy / distance;

        const relativeVelocityX = b.velocity.x - a.velocity.x;

        const relativeVelocityY = b.velocity.y - a.velocity.y;

        const velocityAlongNormal =
          relativeVelocityX * nx + relativeVelocityY * ny;

        // already moving apart
        if (velocityAlongNormal > 0) {
          continue;
        }

        const massA = a.size;
        const massB = b.size;

        const impulse = (2 * velocityAlongNormal) / (massA + massB);

        a.velocity.x += impulse * massB * nx;

        a.velocity.y += impulse * massB * ny;

        b.velocity.x -= impulse * massA * nx;

        b.velocity.y -= impulse * massA * ny;

        // separate overlapping asteroids
        const overlap = minDistance - distance;

        const separationX = (nx * overlap) / 2;

        const separationY = (ny * overlap) / 2;

        a.x -= separationX;
        a.y -= separationY;

        b.x += separationX;
        b.y += separationY;

        // add particles
        const impactX = a.x + nx * (a.size * 10);

        const impactY = a.y + ny * (a.size * 10);

        const impactPosition = vec2.create(impactX, impactY);

        createImpactParticles(
          impactPosition,
          vec2.create(relativeVelocityX, relativeVelocityY),
        );

        sfx.play("hit");

        // equal-sized asteroids can combine
        if (a.size === b.size && a.size !== 5) {
          const combineChance = 0.15;

          if (Math.random() < combineChance) {
            const newSize: AsteroidSize = a.size === 1 ? 3 : 5;

            const combinedPosition = {
              x: (a.x + b.x) / 2,
              y: (a.y + b.y) / 2,
            };

            // Preserve some of the momentum
            // of the two colliding asteroids.
            const combinedVelocity = vec2.create(
              (a.velocity.x + b.velocity.x) / 2,

              (a.velocity.y + b.velocity.y) / 2,
            );

            const combined: Asteroid = {
              x: combinedPosition.x,
              y: combinedPosition.y,
              size: newSize,
              velocity: combinedVelocity,
            };

            // These are being COMBINED, not broken.
            removedAsteroids.add(a);
            removedAsteroids.add(b);

            combinedAsteroids.push(combined);

            createExplosion(a);
            createExplosion(b);

            sfx.play("grow");
          }

          continue;
        }

        // chance for the larger asteroid
        // to break the smaller asteroid
        const large = a.size > b.size ? a : b;

        const small = a.size > b.size ? b : a;

        const breakChance: Record<AsteroidSize, number> = {
          5: 0.1,
          3: 0.05,
          1: 0,
        };

        if (Math.random() < breakChance[large.size]) {
          brokenAsteroids.add(small);
        }
      }
    }
  }

  // Remove asteroids that were combined.
  removedAsteroids.forEach((asteroid) => {
    const index = asteroids.indexOf(asteroid);

    if (index !== -1) {
      asteroids.splice(index, 1);
    }
  });

  // Break asteroids damaged by normal collisions.
  brokenAsteroids.forEach((asteroid) => {
    // Don't break an asteroid that was
    // already removed as part of a combine.
    if (removedAsteroids.has(asteroid)) {
      return;
    }

    const children = breakAsteroid(asteroid);

    const index = asteroids.indexOf(asteroid);

    if (index !== -1) {
      asteroids.splice(index, 1);
      asteroids.push(...children);
    }
  });

  // Add asteroids created by combining.
  asteroids.push(...combinedAsteroids);

  // update the bullet ballistics
  bullets.forEach((bullet) => {
    bullet.previousPosition = vec2.clone(bullet.position);

    const movement = vec2.clone(bullet.velocity);

    movement.multiplyScalar(dt);

    bullet.position.add(movement);

    bullet.lifetime -= dt;

    let wrapped = false;

    if (bullet.position.x > WIDTH) {
      bullet.position.x = 0;
      wrapped = true;
    }

    if (bullet.position.x < 0) {
      bullet.position.x = WIDTH;
      wrapped = true;
    }

    if (bullet.position.y > HEIGHT) {
      bullet.position.y = 0;
      wrapped = true;
    }

    if (bullet.position.y < 0) {
      bullet.position.y = HEIGHT;
      wrapped = true;
    }

    if (wrapped) {
      bullet.previousPosition = vec2.clone(bullet.position);
    }
  });

  // remove bullets whose lifetime has expired
  bullets = bullets.filter((bullet) => bullet.lifetime > 0);

  // check for bullet/asteroid collisions
  const hitAsteroids: Asteroid[] = [];

  bullets = bullets.filter((bullet) => {
    const asteroid = asteroids.find((asteroid) => {
      const dx = bullet.position.x - asteroid.x;

      const dy = bullet.position.y - asteroid.y;

      const distance = Math.sqrt(dx * dx + dy * dy);

      return distance <= asteroid.size * 10;
    });

    if (asteroid) {
      hitAsteroids.push(asteroid);
      return false;
    }

    return true;
  });

  // break hit asteroids
  hitAsteroids.forEach((asteroid) => {
    createExplosion(asteroid);

    const children = breakAsteroid(asteroid);

    sfx.play("break");

    asteroids.splice(asteroids.indexOf(asteroid), 1);

    asteroids.push(...children);

    score += asteroid.size;
  });
});

game.setRender(({ gfx }: RenderCallbackOptions) => {
  gfx.clear("black");
  gfx.strokeGlow(() => {
    drawAsteroids(gfx, asteroids)
    drawParticles(gfx, particles)
    drawPlayer(gfx, player)
    drawShield(gfx, player)
    drawBomb(gfx, bombRadius, player)
    drawBullets(gfx, bullets)
    drawHUD(gfx, score)
  }, {
    blur: GLOW,
    colour: COLOUR,
  });
});

game.start();
