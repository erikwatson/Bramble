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
function create(canvas) {
    var defaultState = function () {
        return {
            x: 0,
            y: 0,
            left: defaultButtonState(),
            wheel: defaultWheelState(),
            right: defaultButtonState()
        };
    };
    var defaultButtonState = function () {
        return {
            pressed: false,
            justPressed: false,
            released: false,
            justReleased: false
        };
    };
    var defaultWheelState = function () {
        var buttonState = defaultButtonState();
        return __assign(__assign({}, buttonState), { moved: false, direction: 'up' });
    };
    var prevMouse = defaultState();
    var mouse = defaultState();
    var clone = function (state) {
        return Object.assign({}, state);
    };
    var relative = function (event) {
        var bounds = canvas.getBoundingClientRect();
        return {
            x: event.clientX - bounds.left,
            y: event.clientY - bounds.top
        };
    };
    var move = function (event) {
        var newPos = relative(event);
        mouse.x = newPos.x;
        mouse.y = newPos.y;
    };
    var down = function (event) {
        switch (event.which) {
            case 1:
                mouse.left.pressed = true;
                break;
            case 2:
                mouse.wheel.pressed = true;
                break;
            case 3:
                mouse.right.pressed = true;
                break;
        }
    };
    var up = function (event) {
        switch (event.which) {
            case 1:
                mouse.left.pressed = false;
                break;
            case 2:
                mouse.wheel.pressed = false;
                break;
            case 3:
                mouse.right.pressed = false;
                break;
        }
    };
    var wheel = function (event) {
        mouse.wheel.moved = event.deltaY === 0 ? false : true;
        if (mouse.wheel.moved !== false) {
            mouse.wheel.direction = event.deltaY < 0 ? 'up' : 'down';
        }
    };
    var update = function () {
        mouse.wheel.moved = false;
        prevMouse = clone(mouse);
    };
    var start = function () {
        // mouse events
        canvas.addEventListener('mousemove', move);
        canvas.addEventListener('mousedown', down);
        canvas.addEventListener('mouseup', up);
        canvas.addEventListener('wheel', wheel);
        // default mouse position, center of screen
        mouse.x = canvas.width / 2;
        mouse.y = canvas.height / 2;
    };
    return {
        getState: function () { return mouse; },
        start: start,
        update: update
    };
}
exports.default = { create: create };
