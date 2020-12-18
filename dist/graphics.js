"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var number_1 = require("./number");
function clear(ctx, colour) {
    rect(ctx, 0, 0, ctx.canvas.width, ctx.canvas.height, {
        fill: {
            colour: colour
        }
    });
}
function square(ctx, x, y, size, options) {
    if (options === void 0) { options = defaultRect; }
    rect(ctx, x, y, size, size, options);
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
function rect(ctx, x, y, w, h, options) {
    if (options === void 0) { options = defaultRect; }
    if (typeof options.fill !== 'undefined') {
        ctx.fillStyle = options.fill.colour;
        ctx.fillRect(x, y, w, h);
    }
    if (typeof options.line !== 'undefined') {
        ctx.strokeStyle = options.line.colour;
        ctx.lineWidth = options.line.width;
        ctx.strokeRect(x, y, w, h);
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
function circle(ctx, x, y, radius, options) {
    if (options === void 0) { options = defaultCircle; }
    // not happy with this really, make another function i think
    if (typeof options.fill !== 'undefined') {
        ctx.fillStyle = options.fill.colour;
    }
    ctx.beginPath();
    ctx.strokeStyle = options.line.colour;
    ctx.lineWidth = options.line.width;
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.closePath();
    if (typeof options.fill !== 'undefined') {
        ctx.fill();
    }
    ctx.stroke();
}
function image(ctx, x, y, w, h, image) {
    ctx.drawImage(image, x, y, w, h);
}
function subImage(ctx, x, y, w, h, sx, sy, sw, sh, image) {
    ctx.drawImage(image, sx, sy, sw, sh, x, y, w, h);
}
function sprite(ctx, sprite) {
    var halfWidth = sprite.width / 2;
    var halfHeight = sprite.height / 2;
    ctx.save();
    ctx.translate(sprite.x + halfWidth, sprite.y + halfHeight);
    ctx.rotate(number_1.default.toRadians(sprite.rotation));
    if (sprite.frames.length > 1) {
        subImage(ctx, -halfWidth, -halfHeight, sprite.width, sprite.height, sprite.frames[sprite.frame].x, sprite.frames[sprite.frame].y, sprite.frames[sprite.frame].width, sprite.frames[sprite.frame].height, sprite.texture);
    }
    else {
        image(ctx, -halfWidth, -halfHeight, sprite.width, sprite.height, sprite.texture);
    }
    ctx.restore();
}
function txt(ctx, x, y, text, colour, font) {
    if (x === void 0) { x = 0; }
    if (y === void 0) { y = 0; }
    if (text === void 0) { text = ''; }
    if (colour === void 0) { colour = '#000000'; }
    if (font === void 0) { font = '16pt sans-serif'; }
    ctx.fillStyle = colour;
    ctx.font = font;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText(text, x, y);
}
// TODO: Figure out word wrapping for these boxes.
//
//       I think we will probably have to split the text up into lines of
//       appropriate width, then render each one of them individually.
//
//       This could probably be cached in the object itself as long as we update
//       every time there's a change to the font, text, width or height.
function textbox(ctx, textbox) {
    ctx.fillStyle = '#ffffff';
    ctx.font = '16pt sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    var measurements = ctx.measureText(textbox.text);
    if (measurements.width > textbox.width) {
        textbox.text = textbox.text.substr(0, 10) + '\n' + textbox.text.substr(10);
    }
    ctx.fillText(textbox.text, textbox.x, textbox.y);
}
function tile(ctx, positionX, positionY, tilesheet, gridX, gridY, tileSheetX, tileSheetY, scale, tileWidth, tileHeight) {
    subImage(ctx, positionX + scale * (gridX * tileWidth), positionY + scale * (gridY * tileHeight), scale * tileWidth, scale * tileHeight, tileWidth * tileSheetX, tileHeight * tileSheetY, tileWidth, tileHeight, tilesheet);
}
// tilegrid: a 2d array of numbers representing terrain types
// spritesheets: An object, each key is the value that represents a tile from this sheet
function tiles(ctx, positionX, positionY, tileGrid, spriteSheets, scale, tileWidth, tileHeight) {
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
                tile(ctx, positionX, positionY, sheet.image, x, y, selection.position.x, selection.position.y, scale, selection.size.width, selection.size.height);
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
        circle: function (x, y, radius, options) {
            if (options === void 0) { options = defaultCircle; }
            circle(ctx, x, y, radius, options);
        },
        clear: function (colour) {
            clear(ctx, colour);
        },
        square: function (x, y, size, options) {
            if (options === void 0) { options = defaultRect; }
            square(ctx, x, y, size, options);
        },
        rect: function (x, y, w, h, options) {
            if (options === void 0) { options = defaultRect; }
            rect(ctx, x, y, w, h, options);
        },
        image: function (x, y, w, h, img) {
            image(ctx, x, y, w, h, img);
        },
        line: function (from, to, options) {
            if (options === void 0) { options = defaultLine; }
            line(ctx, from, to, options);
        },
        sprite: function (spr) {
            sprite(ctx, spr);
        },
        subImage: function (x, y, w, h, sx, sy, sw, sh, img) {
            subImage(ctx, x, y, w, h, sx, sy, sw, sh, img);
        },
        text: function (x, y, text, colour, font) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (text === void 0) { text = ''; }
            if (colour === void 0) { colour = '#000000'; }
            if (font === void 0) { font = '16pt sans-serif'; }
            txt(ctx, x, y, text, colour, font);
        },
        textbox: function (tb) {
            textbox(ctx, tb);
        },
        tiles: function (positionX, positionY, tileGrid, spriteSheets, scale, tileWidth, tileHeight) {
            tiles(ctx, positionX, positionY, tileGrid, spriteSheets, scale, tileWidth, tileHeight);
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
    textbox: textbox,
    tiles: tiles,
    shadow: shadow,
    dodge: dodge,
    overlay: overlay,
    transparency: transparency
};
