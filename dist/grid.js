"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
function make2DArray(width, height, defaultValue) {
    if (width === void 0) { width = 1; }
    if (height === void 0) { height = 1; }
    if (defaultValue === void 0) { defaultValue = null; }
    var result = [];
    for (var y = 0; y < height; y++) {
        var row = [];
        for (var x = 0; x < width; x++) {
            row.push(defaultValue);
        }
        result.push(row);
    }
    return result;
}
function copyTiles(tiles) {
    return tiles.map(function (arr) { return arr.slice(); });
}
var defaultGrid = {
    pos: { x: 0, y: 0 },
    visible: true,
    divisions: 4,
    tileWidth: 8,
    tileHeight: 8,
    scale: 1
};
function fill(tiles, position, target, replacement) {
    var gridClone = copyTiles(tiles);
    function floodFill(position, target, replacement) {
        if (target === replacement) {
            return;
        }
        var valueAtPosition = gridClone[position.y][position.x];
        if (valueAtPosition !== target) {
            return;
        }
        var isWithinBounds = position.x < gridClone[position.y].length &&
            position.x >= 0 &&
            position.y < gridClone.length &&
            position.y >= 0;
        if (isWithinBounds) {
            gridClone[position.y][position.x] = replacement;
            if (position.y < gridClone.length - 1) {
                floodFill({ x: position.x, y: position.y + 1 }, target, replacement);
            }
            if (position.y > 0) {
                floodFill({ x: position.x, y: position.y - 1 }, target, replacement);
            }
            if (position.x < gridClone[0].length - 1) {
                floodFill({ x: position.x + 1, y: position.y }, target, replacement);
            }
            if (position.x > 0) {
                floodFill({ x: position.x - 1, y: position.y }, target, replacement);
            }
        }
        return;
    }
    if (true) {
        floodFill(position, target, replacement);
    }
    return gridClone;
}
function create(width, height, options) {
    if (options === void 0) { options = defaultGrid; }
    options = __assign(__assign({}, defaultGrid), options);
    var tiles = make2DArray(width, height, 0);
    var pos = { x: options.pos.x, y: options.pos.y };
    var visible = options.visible;
    var divisions = options.divisions;
    var tileWidth = options.tileWidth;
    var tileHeight = options.tileHeight;
    var tileSize = options.tileWidth;
    var scale = options.scale;
    return {
        divisions: divisions,
        pos: pos,
        tileHeight: tileHeight,
        tiles: tiles,
        tileWidth: tileWidth,
        visible: visible,
        width: width,
        height: height,
        tileSize: tileSize,
        scale: scale
    };
}
exports.default = {
    create: create,
    fill: fill,
    copyTiles: copyTiles
};
