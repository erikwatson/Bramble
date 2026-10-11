import { type Graphics } from '@erikwatson/bramble'
import { WIDTH, HEIGHT, COLOUR, LINE_WIDTH } from "./constants";
import { drawWrappedBomb } from "./functions";
import type { Asteroid, Bullet, Particle, Player } from './types';

export function drawHUD(gfx: Graphics, score: number) {
  // border
  gfx.rect(
    {
      x: 10,
      y: 10,
      width: WIDTH - 20,
      height: HEIGHT - 20,
    },
    {
      fill: {
        opacity: 0,
      },

      line: {
        colour: COLOUR,
        width: LINE_WIDTH,
      },
    },
  );

  // score
  gfx.text(
    {
      x: 24,
      y: 24,
    },
    `SCORE: ${score}`,
    {
      colour: COLOUR,
      size: "24px",
      family: "monospace",
    },
  );

  // instructions
  gfx.text(
    {
      x: 24,
      y: HEIGHT - 36,
    },
    `Controls: LEFT/A and RIGHT/D to aim, UP/W to move, Z to shoot, SPACE to bomb, X for shield`,
    {
      colour: COLOUR,
      size: "16px",
      family: "monospace",
    },
  );
}

export function drawAsteroids(gfx: Graphics, asteroids: Asteroid[]) {
  asteroids.forEach((asteroid) => {
    gfx.circle(
      {
        x: asteroid.x,
        y: asteroid.y,
      },
      asteroid.size * 10,
      {
        line: {
          colour: COLOUR,
          width: LINE_WIDTH,
        },

        fill: {
          opacity: 0,
        },
      },
    );
  });
}

export function drawParticles(gfx: Graphics, particles: Particle[]) {
  particles.forEach((particle) => {
    gfx.line(particle.position, particle.previousPosition, {
      width: LINE_WIDTH,
      colour: particle.colour ?? COLOUR,
    });
  });
}

export function drawPlayer(gfx: Graphics, player: Player) {
  gfx.rotate(
    () => {
      gfx.line(
        player.position,
        {
          x: player.position.x - 10,

          y: player.position.y - 24,
        },
        {
          width: 2,
          colour: COLOUR,
        },
      );

      gfx.line(
        player.position,
        {
          x: player.position.x + 10,

          y: player.position.y - 24,
        },
        {
          width: 2,
          colour: COLOUR,
        },
      );

      gfx.line(
        {
          x: player.position.x - 10,

          y: player.position.y - 24,
        },
        {
          x: player.position.x,

          y: player.position.y - 20,
        },
        {
          width: 2,
          colour: COLOUR,
        },
      );

      gfx.line(
        {
          x: player.position.x,

          y: player.position.y - 20,
        },
        {
          x: player.position.x + 10,

          y: player.position.y - 24,
        },
        {
          width: 2,
          colour: COLOUR,
        },
      );
    },
    player.angle,
    {
      x: player.position.x,
      y: player.position.y - 12,
    },
  );

}

export function drawShield(gfx: Graphics, player: Player) {
  if (player.shield) {
    gfx.circle(
      {
        x: player.position.x,
        y: player.position.y - 14,
      },
      16,
      {
        line: {
          width: 2,
          colour: "white",
        },

        fill: {
          opacity: 0,
        },
      },
    );
  }
}

export function drawBomb(gfx: Graphics, bombRadius: number, player: Player) {
  if (bombRadius > 0) {
    drawWrappedBomb(gfx, player.position, bombRadius);
    // draw the player in black
    gfx.rotate(
      () => {
        gfx.line(
          player.position,
          {
            x: player.position.x - 10,

            y: player.position.y - 24,
          },
          {
            width: 2,
            colour: "black",
          },
        );

        gfx.line(
          player.position,
          {
            x: player.position.x + 10,

            y: player.position.y - 24,
          },
          {
            width: 2,
            colour: "black",
          },
        );

        gfx.line(
          {
            x: player.position.x - 10,

            y: player.position.y - 24,
          },
          {
            x: player.position.x,

            y: player.position.y - 20,
          },
          {
            width: 2,
            colour: "black",
          },
        );

        gfx.line(
          {
            x: player.position.x,

            y: player.position.y - 20,
          },
          {
            x: player.position.x + 10,

            y: player.position.y - 24,
          },
          {
            width: 2,
            colour: COLOUR,
          },
        );
      },
      player.angle,
      {
        x: player.position.x,
        y: player.position.y - 12,
      },
    );
  }
}

export function drawBullets(gfx: Graphics, bullets: Bullet[]) {
  bullets.forEach((bullet) => {
    gfx.line(bullet.position, bullet.previousPosition, {
      width: LINE_WIDTH * 2,
      colour: COLOUR,
    });
  });
}
