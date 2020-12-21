"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.keyboard = exports.mouse = void 0;
var mouse_1 = require("./input/mouse");
function create(canvas) {
    var mouseInput = mouse_1.default.create(canvas);
    var start = function () {
        mouseInput.start();
    };
    var update = function () {
        mouseInput.update();
    };
    return {
        start: start,
        update: update,
        getState: function () { return mouseInput.getState(); }
    };
}
exports.mouse = {
    create: create
};
exports.keyboard = {
    create: function () {
        console.log('keyboard input stub');
    }
};
