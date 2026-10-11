import { type Point, vec2, type Graphics } from "@erikwatson/bramble";
import type { AsteroidSize, Asteroid } from "./types";
import { COLOUR, HEIGHT, WIDTH } from "./constants";

export const spawnAsteroid = (
  size: AsteroidSize,
  position: Point = {
    x: Math.random() * WIDTH,
    y: Math.random() * HEIGHT,
  },
): Asteroid => {
  const range = size * 10;
  const deadZone = size * 5;

  const randomOffset = () => {
    const value = Math.random() * (range * 2 - deadZone * 2);

    return value < range - deadZone ? value - range : value + deadZone;
  };

  const x = position.x + randomOffset();
  const y = position.y + randomOffset();

  const velocity = vec2.create(x - position.x, y - position.y);

  velocity.normalise();

  const speed: Record<AsteroidSize, number> = {
    1: 100,
    3: 50,
    5: 25,
  };

  velocity.multiplyScalar(speed[size] + Math.random() * 50);

  return {
    x,
    y,
    size,
    velocity,
  };
};

export const breakAsteroid = (asteroid: Asteroid): Asteroid[] => {
  if (asteroid.size === 5) {
    return [spawnAsteroid(3, asteroid), spawnAsteroid(3, asteroid)];
  }

  if (asteroid.size === 3) {
    return [
      spawnAsteroid(1, asteroid),
      spawnAsteroid(1, asteroid),
      spawnAsteroid(1, asteroid),
    ];
  }

  return [];
};

export const drawWrappedBomb = (
  gfx: Graphics,
  position: Point,
  radius: number,
): void => {
  const offsets = [-1, 0, 1];

  offsets.forEach((xOffset) => {
    offsets.forEach((yOffset) => {
      gfx.circle(
        {
          x: position.x + xOffset * WIDTH,

          y: position.y + yOffset * HEIGHT,
        },
        radius,
        {
          line: {
            colour: COLOUR,
            width: 2,
          },

          fill: {
            colour: COLOUR,
            opacity: 1,
          },
        },
      );
    });
  });
};
