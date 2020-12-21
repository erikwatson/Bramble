"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var number_1 = require("./utils/number");
function clear(ctx, colour) {
    rect(ctx, { x: 0, y: 0 }, { width: ctx.canvas.width, height: ctx.canvas.height }, {
        fill: {
            colour: colour
        }
    });
}
function square(ctx, position, size, options) {
    if (options === void 0) { options = defaultRect; }
    rect(ctx, { x: position.x, y: position.y }, { width: size, height: size }, options);
}
var defaultRect = {
    fill: {
        colour: '#ffffff',
        opacity: 1
    },
    line: {
        width: 2,
        colour: '#000000',
        opacity: 1
    }
};
function rect(ctx, position, size, options) {
    if (options === void 0) { options = defaultRect; }
    if (typeof options.fill !== 'undefined') {
        ctx.fillStyle = options.fill.colour;
        ctx.fillRect(position.x, position.y, size.width, size.height);
    }
    if (typeof options.line !== 'undefined') {
        ctx.strokeStyle = options.line.colour;
        ctx.lineWidth = options.line.width;
        ctx.strokeRect(position.x, position.y, size.width, size.height);
    }
}
var defaultLine = {
    width: 2,
    colour: '#000000'
};
function line(ctx, from, to, options) {
    if (options === void 0) { options = defaultLine; }
    ctx.strokeStyle = options.colour;
    ctx.lineWidth = options.width;
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();
}
var defaultCircle = {
    fill: {
        colour: '#000000',
        opacity: 1
    },
    line: {
        colour: '#ffffff',
        opacity: 1,
        width: 2
    }
};
function circle(ctx, position, radius, options) {
    if (options === void 0) { options = defaultCircle; }
    // not happy with this really, make another function i think
    if (typeof options.fill !== 'undefined') {
        ctx.fillStyle = options.fill.colour;
    }
    ctx.beginPath();
    ctx.strokeStyle = options.line.colour;
    ctx.lineWidth = options.line.width;
    ctx.arc(position.x, position.y, radius, 0, 2 * Math.PI);
    ctx.closePath();
    if (typeof options.fill !== 'undefined') {
        ctx.fill();
    }
    ctx.stroke();
}
function image(ctx, position, size, image) {
    ctx.drawImage(image, position.x, position.y, size.width, size.height);
}
function subImage(ctx, position, size, subPosition, subSize, image) {
    ctx.drawImage(image, subPosition.x, subPosition.y, subSize.width, subSize.height, position.x, position.y, size.width, size.height);
}
function sprite(ctx, sprite) {
    var halfWidth = sprite.width / 2;
    var halfHeight = sprite.height / 2;
    ctx.save();
    ctx.translate(sprite.x + halfWidth, sprite.y + halfHeight);
    ctx.rotate(number_1.default.toRadians(sprite.rotation));
    if (sprite.frames.length > 1) {
        subImage(ctx, {
            x: -halfWidth,
            y: -halfHeight
        }, {
            width: sprite.width,
            height: sprite.height
        }, {
            x: sprite.frames[sprite.frame].x,
            y: sprite.frames[sprite.frame].y
        }, {
            width: sprite.frames[sprite.frame].width,
            height: sprite.frames[sprite.frame].height
        }, sprite.texture);
    }
    else {
        image(ctx, {
            x: -halfWidth,
            y: -halfHeight
        }, {
            width: sprite.width,
            height: sprite.height,
        }, sprite.texture);
    }
    ctx.restore();
}
function txt(ctx, position, text, colour, font) {
    if (text === void 0) { text = ''; }
    if (colour === void 0) { colour = '#000000'; }
    if (font === void 0) { font = '16pt sans-serif'; }
    ctx.fillStyle = colour;
    ctx.font = font;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText(text, position.x, position.y);
}
function tile(ctx, position, tilesheet, gridPosition, tilesheetPosition, scale, tileSize) {
    subImage(ctx, {
        x: position.x + scale * (gridPosition.x * tileSize.width),
        y: position.y + scale * (gridPosition.y * tileSize.height)
    }, {
        width: scale * tileSize.width,
        height: scale * tileSize.height
    }, {
        x: tileSize.width * tilesheetPosition.x,
        y: tileSize.height * tilesheetPosition.y
    }, {
        width: tileSize.width,
        height: tileSize.height
    }, tilesheet);
}
// tilegrid: a 2d array of numbers representing terrain types
// spritesheets: An object, each key is the value that represents a tile from this sheet
function tiles(ctx, position, tileGrid, spriteSheets, scale, tileSize) {
    var dirValues = {
        NW: 1,
        N: 2,
        NE: 4,
        E: 8,
        SE: 16,
        S: 32,
        SW: 64,
        W: 128
    };
    var _loop_1 = function (y) {
        var _loop_2 = function (x) {
            if (tileGrid[y][x] === 0) {
                return "continue";
            }
            // REAL VALUES
            var tl = y > 0 ? tileGrid[y - 1][x - 1] : 0;
            var tm = y > 0 ? tileGrid[y - 1][x] : 0;
            var tr = y > 0 ? tileGrid[y - 1][x + 1] : 0;
            var ml = tileGrid[y][x - 1];
            var m = tileGrid[y][x];
            var mr = tileGrid[y][x + 1];
            var bl = y < tileGrid.length - 1 ? tileGrid[y + 1][x - 1] : 0;
            var bm = y < tileGrid.length - 1 ? tileGrid[y + 1][x] : 0;
            var br = y < tileGrid.length - 1 ? tileGrid[y + 1][x + 1] : 0;
            // BINARY VALUES
            var n = m === tm ? 1 : 0;
            var e = m === mr ? 1 : 0;
            var s = m === bm ? 1 : 0;
            var w = m === ml ? 1 : 0;
            var nw = m === tm && m === ml ? (m === tl ? 1 : 0) : 0;
            var ne = m === tm && m === mr ? (m === tr ? 1 : 0) : 0;
            var sw = m === bm && m === ml ? (m === bl ? 1 : 0) : 0;
            var se = m === bm && m === mr ? (m === br ? 1 : 0) : 0;
            var sum = dirValues.NW * nw +
                dirValues.N * n +
                dirValues.NE * ne +
                dirValues.E * e +
                dirValues.SE * se +
                dirValues.S * s +
                dirValues.SW * sw +
                dirValues.W * w;
            // Figure out which sheet we're supposed to be drawing from
            var sheet = spriteSheets.filter(function (sheet) {
                return sheet.type === tileGrid[y][x];
            })[0];
            if (!sheet) {
                console.error("Sheet " + tileGrid[y][x] + " not found!");
                return { value: void 0 };
            }
            var selections = sheet.tiles.filter(function (x) { return x.type === sum; });
            // Note: Just picking a random one of the variants every time we render for now
            var selection = selections[Math.floor(Math.random() * selections.length)];
            if (selection) {
                tile(ctx, position, sheet.image, { x: x, y: y }, selection.position, scale, selection.size);
            }
            else {
                console.log("Tile not defined " + sum);
            }
        };
        for (var x = 0; x < tileGrid[y].length; x++) {
            var state_2 = _loop_2(x);
            if (typeof state_2 === "object")
                return state_2;
        }
    };
    for (var y = 0; y < tileGrid.length; y++) {
        var state_1 = _loop_1(y);
        if (typeof state_1 === "object")
            return state_1.value;
    }
}
var defaultDropShadow = {
    shadowcolour: '#000000',
    shadowBlur: 6,
    shadowOffsetX: 4,
    shadowOffsetY: 4
};
function shadow(ctx, drawingOperations, options) {
    if (options === void 0) { options = defaultDropShadow; }
    ctx.save();
    ctx.shadowColor = options.shadowcolour;
    ctx.shadowBlur = options.shadowBlur;
    ctx.shadowOffsetX = options.shadowOffsetX;
    ctx.shadowOffsetY = options.shadowOffsetY;
    drawingOperations();
    ctx.restore();
}
function dodge(ctx, drawingOperations) {
    ctx.save();
    ctx.globalCompositeOperation = 'colour-dodge';
    drawingOperations();
    ctx.restore();
}
function overlay(ctx, drawingOperations) {
    ctx.save();
    ctx.globalCompositeOperation = 'overlay';
    drawingOperations();
    ctx.restore();
}
function transparency(ctx, drawingOperations, alpha) {
    if (alpha === void 0) { alpha = 0.25; }
    ctx.save();
    ctx.globalAlpha = alpha;
    drawingOperations();
    ctx.restore();
}
function create(ctx) {
    return {
        circle: function (position, radius, options) {
            if (options === void 0) { options = defaultCircle; }
            circle(ctx, position, radius, options);
        },
        clear: function (colour) {
            clear(ctx, colour);
        },
        square: function (position, size, options) {
            if (options === void 0) { options = defaultRect; }
            square(ctx, position, size, options);
        },
        rect: function (position, size, options) {
            if (options === void 0) { options = defaultRect; }
            rect(ctx, position, size, options);
        },
        image: function (position, size, img) {
            image(ctx, position, size, img);
        },
        line: function (from, to, options) {
            if (options === void 0) { options = defaultLine; }
            line(ctx, from, to, options);
        },
        sprite: function (spr) {
            sprite(ctx, spr);
        },
        subImage: function (position, size, subPosition, subSize, img) {
            subImage(ctx, position, size, subPosition, subSize, img);
        },
        text: function (position, text, colour, font) {
            if (position === void 0) { position = { x: 0, y: 0 }; }
            if (text === void 0) { text = ''; }
            if (colour === void 0) { colour = '#000000'; }
            if (font === void 0) { font = '16pt sans-serif'; }
            txt(ctx, position, text, colour, font);
        },
        tiles: function (position, tileGrid, spriteSheets, scale, tileSize) {
            tiles(ctx, position, tileGrid, spriteSheets, scale, tileSize);
        },
        shadow: function (drawingOperations, options) {
            if (options === void 0) { options = defaultDropShadow; }
            shadow(ctx, drawingOperations, options);
        },
        dodge: function (drawingOperations) {
            dodge(ctx, drawingOperations);
        },
        overlay: function (drawingOperations) {
            overlay(ctx, drawingOperations);
        },
        transparency: function (drawingOperations, alpha) {
            if (alpha === void 0) { alpha = 0.25; }
            transparency(ctx, drawingOperations, alpha);
        }
    };
}
exports.default = {
    create: create,
    circle: circle,
    clear: clear,
    image: image,
    line: line,
    rect: rect,
    sprite: sprite,
    square: square,
    subImage: subImage,
    text: txt,
    tiles: tiles,
    shadow: shadow,
    dodge: dodge,
    overlay: overlay,
    transparency: transparency
};
