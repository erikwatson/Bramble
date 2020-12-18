"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var graphics_1 = require("./graphics");
var input_1 = require("./input");
var create = function () {
    var backgroundColor = '#000000';
    var update = null;
    var render = null;
    // These are used for calculating the Delta Time for the Frame
    var prevTime = 0;
    var frameTime = 0;
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    var graphics = graphics_1.default.create(ctx);
    canvas.id = 'bramble-game';
    var mouseInput = null; //  mouse.create(canvas.element)
    var setBackgroundColor = function (color) {
        backgroundColor = color;
    };
    var setUpdate = function (callback) {
        update = callback;
    };
    var setRender = function (callback) {
        render = callback;
    };
    var step = function () {
        if (update) {
            update(1 / 60); // TODO: fake it at 60fps for now
        }
        if (render) {
            graphics.clear(backgroundColor);
            render(graphics);
        }
        mouseInput.update();
        window.requestAnimationFrame(step);
    };
    var start = function () {
        mouseInput = input_1.mouse.create(canvas);
        mouseInput.start();
        window.requestAnimationFrame(step);
    };
    var setSize = function (width, height) {
        canvas.width = width;
        canvas.height = height;
    };
    var attachTo = function (element) {
        element.appendChild(canvas);
    };
    // NOTE: Must be called AFTER anything that would change our context.
    //       setSize for example.
    var setSmoothing = function (to) {
        if (to === void 0) { to = true; }
        ctx.imageSmoothingEnabled = to;
    };
    var disableContextMenu = function () {
        canvas.addEventListener('contextmenu', function (e) {
            e.preventDefault();
        });
    };
    return {
        setSize: setSize,
        setUpdate: setUpdate,
        setRender: setRender,
        setBackgroundColor: setBackgroundColor,
        attachTo: attachTo,
        disableContextMenu: disableContextMenu,
        setSmoothing: setSmoothing,
        start: start,
        getMouseState: function () { return mouseInput.getState(); }
    };
};
exports.default = {
    create: create
};
