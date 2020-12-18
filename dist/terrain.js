"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function create(name, type, image, tiles) {
    return {
        name: name,
        type: type,
        image: image,
        tiles: tiles
    };
}
exports.default = {
    create: create
};
