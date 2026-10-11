// import { vec2 } from '@erikwatson/bramble'
// import type { Particle, Player } from './types';

// export function addMuzzleParticles(player: Player, particles: Particle[]) {
//   const count = Math.floor(Math.random() * 10) + 1;

//       for (let i = 0; i < count; i++) {
//         const variance = Math.random() * 120 - 60;

//         const particleAngle = vec2.degreesToRadians(player.angle + 90 + variance);

//         const particleDirection = vec2.create(
//           Math.cos(particleAngle),
//           Math.sin(particleAngle),
//         );

//         particleDirection.multiplyScalar(250 + Math.random() * 150);

//         // add the ship's actual movement velocity
//         const shipAngle = vec2.degreesToRadians(player.angle + 90);

//         const shipVelocity = vec2.create(
//           Math.cos(shipAngle),
//           Math.sin(shipAngle),
//         );

//         shipVelocity.multiplyScalar(player.velocity);

//         particleDirection.add(shipVelocity);

//         particles.push({
//           position: vec2.clone(tip),
//           previousPosition: vec2.clone(tip),
//           velocity: particleDirection,
//           decay: 0.7 + Math.random() * 0.15,
//         });
//       }
// }
