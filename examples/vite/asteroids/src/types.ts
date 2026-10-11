import { type Vec2 } from "@erikwatson/bramble";

export type AsteroidSize = 1 | 3 | 5;

export type Asteroid = {
  x: number;
  y: number;
  size: AsteroidSize;
  velocity: Vec2;
};

export type Particle = {
  position: Vec2;
  previousPosition: Vec2;
  velocity: Vec2;
  decay: number;
  colour?: string;
};

export type Bullet = {
  position: Vec2;
  previousPosition: Vec2;
  velocity: Vec2;
  lifetime: number;
};

export type Player = {
  position: Vec2;
  angle: number;
  rotationSpeed: number;
  velocity: number;
  acceleration: number;
  shield: boolean;
};
