import { Vec2 } from './types';
declare function create(_x: number, _y: number): Vec2;
declare const _default: {
    clone: (v: Vec2) => Vec2;
    create: typeof create;
    fromDegrees: (degrees: number) => Vec2;
};
export default _default;
