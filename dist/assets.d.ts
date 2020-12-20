import { Terrain } from './types';
export declare function loadString(path: string): Promise<string>;
export declare function loadAllText(paths?: string[]): Promise<string[]>;
export declare function loadImage(path: string): Promise<HTMLImageElement>;
export declare function loadAllImages(paths?: string[]): Promise<HTMLImageElement[]>;
export declare function loadTerrain(path: string): Promise<Terrain>;
export declare function loadAllTerrain(paths?: string[]): Promise<Terrain[]>;
declare const _default: {
    loadImage: typeof loadImage;
    loadString: typeof loadString;
    loadAllText: typeof loadAllText;
    loadAllImages: typeof loadAllImages;
    loadTerrain: typeof loadTerrain;
    loadAllTerrain: typeof loadAllTerrain;
};
export default _default;
