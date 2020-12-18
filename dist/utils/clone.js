"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clone = void 0;
function cloneArray(arr) {
    return arr.map(function (x) { return exports.clone(x); });
}
function cloneObject(obj) {
    return Object.keys(obj).reduce(function (acc, val) {
        acc[val] = exports.clone(obj[val]);
        return acc;
    }, {});
}
exports.clone = function (obj) {
    if (Array.isArray(obj)) {
        return cloneArray(obj);
    }
    if (typeof obj === 'object') {
        return cloneObject(obj);
    }
    return obj;
};
exports.default = {
    clone: exports.clone
};
