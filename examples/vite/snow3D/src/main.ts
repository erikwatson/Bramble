import { game as BrambleGame } from "@erikwatson/bramble";

const WIDTH = 800;
const HEIGHT = 600;

const FLAKE_COUNT = 700;
const DEPTH = 1500;
const FOCAL_LENGTH = 500;

const game = BrambleGame.create();

const container = document.getElementById("bramble-container");

game.attachTo(container!);
game.setSize(WIDTH, HEIGHT);
// game.setBackgroundColour("#07101c");

const random = (min: number, max: number): number =>
  min + Math.random() * (max - min);

type Snowflake = {
  x: number;
  y: number;
  z: number;

  prevX: number;
  prevY: number;
  prevZ: number;

  vx: number;
  vy: number;
  vz: number;

  radius: number;
  opacity: number;
  turbulence: number;
  phase: number;
};

const snowflakes = Array.from(
  { length: 700 },
  createSnowflake,
);

function createSnowflake(): Snowflake {
  const x = (Math.random() - 0.5) * WIDTH * 2;
  const y = -HEIGHT - Math.random() * HEIGHT;
  const z = 300 + Math.random() * DEPTH;

  return {
    x,
    y,
    z,

    prevX: x,
    prevY: y,
    prevZ: z,

    vx: (Math.random() - 0.5) * 20,
    vy: 35 + Math.random() * 45,
    vz: 80 + Math.random() * 100,

    radius: 1 + Math.random() * 3,
    opacity: 0.5 + Math.random() * 0.5,

    turbulence: 0.5 + Math.random() * 1.5,
    phase: Math.random() * Math.PI * 2,
  };
}

game.setUpdate(({ dt }) => {
  const time = performance.now() * 0.001;

  for (const flake of snowflakes) {
    // Remember the previous 3D position before moving.
    flake.prevX = flake.x;
    flake.prevY = flake.y;
    flake.prevZ = flake.z;

    const wind =
      Math.sin(flake.z * 0.006 + time * 1.4 + flake.phase) *
      55 *
      flake.turbulence;

    const gust =
      Math.sin(time * 0.7 + flake.y * 0.003 + flake.phase) *
      30;

    flake.vx += (wind + gust) * dt;
    flake.vx *= Math.pow(0.15, dt);

    flake.vy += 8 * dt;

    flake.vy +=
      Math.sin(flake.x * 0.008 + time + flake.phase) *
      4 *
      dt;

    flake.vz +=
      (Math.sin(time * 0.8 + flake.phase) * 25 + 10) *
      dt;

    flake.vz = Math.max(flake.vz, 30);

    flake.x += flake.vx * dt;
    flake.y += flake.vy * dt;
    flake.z -= flake.vz * dt;

    if (
      flake.z <= 5 ||
      flake.y > HEIGHT * 1.5 ||
      Math.abs(flake.x) > WIDTH * 2
    ) {
      Object.assign(flake, createSnowflake());

      flake.y = -HEIGHT - Math.random() * HEIGHT;
      flake.z = DEPTH;
    }
  }
});

game.setRender(({ gfx }) => {
  gfx.clear("#07101c");

  snowflakes.sort((a, b) => b.z - a.z);

  for (const flake of snowflakes) {
    if (flake.z <= 0) {
      continue;
    }

    const scale =
      FOCAL_LENGTH /
      (FOCAL_LENGTH + flake.z);

    const screenX =
      WIDTH / 2 + flake.x * scale;

    const screenY =
      HEIGHT / 2 + flake.y * scale;

    const radius =
      flake.radius * scale;

    const depthFade =
      1 - flake.z / DEPTH;

    const opacity =
      flake.opacity *
      (0.08 + depthFade * 0.92);

    if (
      screenX < -radius * 10 ||
      screenX > WIDTH + radius * 10 ||
      screenY < -radius * 10 ||
      screenY > HEIGHT + radius * 10
    ) {
      continue;
    }

    // Project the previous position too.
    const prevScale =
      FOCAL_LENGTH /
      (FOCAL_LENGTH + flake.prevZ);

    const prevScreenX =
      WIDTH / 2 +
      flake.prevX * prevScale;

    const prevScreenY =
      HEIGHT / 2 +
      flake.prevY * prevScale;

    // The apparent motion gets stronger as the flake approaches.
    const motion =
      Math.min(1, flake.vz / 300);

    const streakOpacity =
      opacity * motion * 0.45;

    // Draw the streak first.
    gfx.opacity(() => {
      gfx.line(
        {
          x: prevScreenX,
          y: prevScreenY,
        },
        {
          x: screenX,
          y: screenY,
        },
        {
          colour: "#ffffff",
          width: Math.max(0.5, radius * 0.65),
        },
      );
    }, streakOpacity);

    // Then draw the actual snowflake.
    gfx.opacity(() => {
      gfx.circle(
        {
          x: screenX,
          y: screenY,
        },
        radius,
        {
          fill: {
            colour: "#ffffff",
          },
          line: {
            width: 0,
          },
        },
      );
    }, opacity);
  }
});

game.start();
