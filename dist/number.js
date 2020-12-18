"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toDegrees = exports.toRadians = void 0;
function toRadians(degrees) {
    return degrees * (Math.PI / 180);
}
exports.toRadians = toRadians;
function toDegrees(radians) {
    return radians * (180 / Math.PI);
}
exports.toDegrees = toDegrees;
exports.default = {
    toRadians: toRadians,
    toDegrees: toDegrees
};
