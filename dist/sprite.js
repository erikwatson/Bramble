"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function create(x, y, width, height, rotation, texture, colour) {
    if (x === void 0) { x = 0; }
    if (y === void 0) { y = 0; }
    if (width === void 0) { width = 0; }
    if (height === void 0) { height = 0; }
    if (rotation === void 0) { rotation = 0; }
    if (colour === void 0) { colour = '#ffffff'; }
    var frames = [];
    return {
        width: width,
        height: height,
        texture: texture,
        colour: colour,
        frame: 0,
        setFrames: function (newFrames) {
            frames = newFrames;
        },
        addFrame: function (frame) {
            frames.push(frame);
        },
        get frames() {
            return frames;
        },
        get x() {
            return x;
        },
        set x(newX) {
            x = newX;
        },
        get y() {
            return y;
        },
        set y(newY) {
            y = newY;
        },
        get rotation() {
            return rotation;
        },
        set rotation(degrees) {
            rotation = degrees >= 360 ? 360 - degrees : degrees;
        }
    };
}
exports.default = {
    create: create
};
