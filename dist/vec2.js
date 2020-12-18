"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function create(_x, _y) {
    var x = _x;
    var y = _y;
    var add = function (v) {
        x += v.x;
        y += v.y;
    };
    var addScalar = function (s) {
        x += s;
        y += s;
    };
    var divide = function (v) {
        x /= v.x;
        y /= v.y;
    };
    var divideScalar = function (s) {
        x /= s;
        y /= s;
    };
    var dot = function (v) {
        return x * v.x + y * v.y;
    };
    var getLength = function () {
        return Math.sqrt(x * x + y * y);
    };
    var getOpposite = function (v) {
        return create(-v.x, -v.y);
    };
    var getPerp = function () {
        return create(-y, x);
    };
    var isEqualTo = function (v) {
        return x == v.x && y == v.y;
    };
    var multiply = function (v) {
        x *= v.x;
        y *= v.y;
    };
    var multiplyScalar = function (s) {
        x *= s;
        y *= s;
    };
    var normalise = function () {
        var l = getLength();
        x = x / l;
        y = y / l;
    };
    var setLength = function (l) {
        normalise();
        multiplyScalar(l);
    };
    var subtract = function (v) {
        x -= v.x;
        y -= v.y;
    };
    var subtractScalar = function (s) {
        x -= s;
        y -= s;
    };
    return {
        add: add,
        addScalar: addScalar,
        clone: clone,
        divide: divide,
        divideScalar: divideScalar,
        dot: dot,
        getLength: getLength,
        getOpposite: getOpposite,
        getPerp: getPerp,
        isEqualTo: isEqualTo,
        multiply: multiply,
        multiplyScalar: multiplyScalar,
        normalise: normalise,
        setLength: setLength,
        subtract: subtract,
        subtractScalar: subtractScalar,
        set x(_x) {
            x = _x;
        },
        get x() {
            return x;
        },
        set y(_y) {
            y = _y;
        },
        get y() {
            return y;
        }
    };
}
var fromDegrees = function (degrees) {
    var rad = degrees * (Math.PI / 180);
    return create(Math.cos(rad), Math.sin(rad));
};
var clone = function (v) {
    return create(v.x, v.y);
};
exports.default = {
    clone: clone,
    create: create,
    fromDegrees: fromDegrees
};
