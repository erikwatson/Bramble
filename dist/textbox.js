"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function create(x, y, width, height, text) {
    if (x === void 0) { x = 0; }
    if (y === void 0) { y = 0; }
    if (width === void 0) { width = 100; }
    if (height === void 0) { height = 50; }
    if (text === void 0) { text = ''; }
    return { x: x, y: y, width: width, height: height, text: text };
}
exports.default = { create: create };
