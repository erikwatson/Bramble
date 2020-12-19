import { Point, GridOptions, Grid } from './types';
declare function copyTiles(tiles: number[][]): number[][];
declare function fill(tiles: number[][], position: Point, target: number, replacement: number): number[][];
declare function create(width: number, height: number, options?: GridOptions): Grid;
declare const _default: {
    create: typeof create;
    fill: typeof fill;
    copyTiles: typeof copyTiles;
};
export default _default;
