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
var keys_1 = require("./keys");
var keys = defaultState();
function defaultState() {
    var defaultState = {
        pressed: false,
        justPressed: false,
        released: false,
        justReleased: false
    };
    return keys_1.default.reduce(function (acc, key) {
        var label = key.label;
        delete key['label'];
        acc[label] = __assign(__assign({}, key), defaultState);
        return acc;
    }, {});
}
function preventDefaultArrows(event) {
    var keys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
    if (keys.includes(event.key)) {
        event.preventDefault();
    }
}
function getKey(event, keys) {
    var result = null;
    var objectKeys = Object.keys(keys);
    for (var i = 0; i < objectKeys.length; i++) {
        if (keys[objectKeys[i]].code === event.keyCode) {
            result = keys[objectKeys[i]];
        }
    }
    return result;
}
function down(event) {
    preventDefaultArrows(event);
    var key = getKey(event, keys);
    key.pressed = true;
}
function up(event) {
    var key = getKey(event, keys);
    key.pressed = false;
}
function update() { }
function start() {
    // keyboard events
    document.addEventListener('keydown', down);
    document.addEventListener('keyup', up);
}
exports.default = {
    start: start,
    update: update,
    state: keys
};
