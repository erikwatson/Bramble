declare function create(canvas: HTMLCanvasElement): {
    start: () => void;
    update: () => void;
    getState: () => import("./types").MouseState;
};
export declare const mouse: {
    create: typeof create;
};
export declare const keyboard: {
    create: () => void;
};
export {};
