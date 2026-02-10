(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Bramble"] = factory();
	else
		root["Bramble"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/js/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/bramble.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/assets.ts":
/*!***********************!*\
  !*** ./src/assets.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadAllSounds = exports.loadSound = exports.loadAllTerrain = exports.loadTerrain = exports.loadAllImages = exports.loadImage = exports.loadAllText = exports.loadText = void 0;
function loadText(path) {
    return new Promise(function (resolve, reject) {
        var request = new XMLHttpRequest();
        request.addEventListener('load', function (_) {
            resolve(request.responseText);
        });
        request.addEventListener('error', function (event) {
            reject(event);
        });
        request.open('GET', path);
        request.send();
    });
}
exports.loadText = loadText;
function loadAllText(paths) {
    if (paths === void 0) { paths = []; }
    return Promise.all(paths.map(function (x) { return loadText(x); }));
}
exports.loadAllText = loadAllText;
function loadImage(path) {
    return new Promise(function (resolve, reject) {
        var img = new Image();
        img.addEventListener('load', function (_) {
            resolve(img);
        });
        img.addEventListener('error', function (err) {
            reject(err);
        });
        img.src = path;
    });
}
exports.loadImage = loadImage;
function loadAllImages(paths) {
    if (paths === void 0) { paths = []; }
    return Promise.all(paths.map(function (x) { return loadImage(x); }));
}
exports.loadAllImages = loadAllImages;
// Downloads a Terrain file,
// reads it,
// downloads the related image file,
// returns a new Terrain object
function loadTerrain(path) {
    var description;
    return loadText(path)
        .then(function (json) {
        description = JSON.parse(json);
        return loadImage(description.path);
    })
        .then(function (image) { return ({
        name: description.name,
        type: description.type,
        image: image,
        tiles: description.tiles
    }); });
}
exports.loadTerrain = loadTerrain;
function loadAllTerrain(paths) {
    if (paths === void 0) { paths = []; }
    return Promise.all(paths.map(function (x) { return loadTerrain(x); }));
}
exports.loadAllTerrain = loadAllTerrain;
function loadSound(path) {
    return new Promise(function (resolve, reject) {
        var request = new XMLHttpRequest();
        request.responseType = 'arraybuffer';
        request.addEventListener('load', function (_) {
            resolve(request.response);
        });
        request.addEventListener('error', function (event) {
            reject(event);
        });
        request.open('GET', path);
        request.send();
    });
}
exports.loadSound = loadSound;
function loadAllSounds(paths) {
    if (paths === void 0) { paths = []; }
    return Promise.all(paths.map(function (x) { return loadSound(x); }));
}
exports.loadAllSounds = loadAllSounds;
function create() {
    var _this = this;
    var store = {
        images: new Map(),
        sounds: new Map(),
        data: new Map(),
    };
    var add = function (label, type, path) { return __awaiter(_this, void 0, void 0, function () {
        var _a, img, snd, dta;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = type;
                    switch (_a) {
                        case 'image': return [3 /*break*/, 1];
                        case 'sound': return [3 /*break*/, 3];
                    }
                    return [3 /*break*/, 5];
                case 1: return [4 /*yield*/, loadImage(path)];
                case 2:
                    img = _b.sent();
                    store.images.set(label, img);
                    return [3 /*break*/, 7];
                case 3: return [4 /*yield*/, loadSound(path)];
                case 4:
                    snd = _b.sent();
                    store.sounds.set(label, snd);
                    return [3 /*break*/, 7];
                case 5: return [4 /*yield*/, loadText(path)];
                case 6:
                    dta = _b.sent();
                    store.data.set(label, dta);
                    _b.label = 7;
                case 7: return [2 /*return*/];
            }
        });
    }); };
    var remove = function (label, type) {
        switch (type) {
            case 'image':
                store.images.delete(label);
                break;
            case 'sound':
                store.sounds.delete(label);
                break;
            default: store.data.delete(label);
        }
    };
    return { add: add, remove: remove, assets: store };
}
exports.default = { create: create };


/***/ }),

/***/ "./src/bramble.ts":
/*!************************!*\
  !*** ./src/bramble.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.collisions = exports.load = exports.save = exports.vec2 = exports.sprite = exports.mouse = exports.keyboard = exports.graphics = exports.grid = exports.game = void 0;
var game_1 = __webpack_require__(/*! ./game */ "./src/game.ts");
Object.defineProperty(exports, "game", { enumerable: true, get: function () { return game_1.default; } });
var grid_1 = __webpack_require__(/*! ./grid */ "./src/grid.ts");
Object.defineProperty(exports, "grid", { enumerable: true, get: function () { return grid_1.default; } });
var graphics_1 = __webpack_require__(/*! ./graphics */ "./src/graphics.ts");
Object.defineProperty(exports, "graphics", { enumerable: true, get: function () { return graphics_1.default; } });
var input_1 = __webpack_require__(/*! ./input */ "./src/input.ts");
Object.defineProperty(exports, "keyboard", { enumerable: true, get: function () { return input_1.keyboard; } });
Object.defineProperty(exports, "mouse", { enumerable: true, get: function () { return input_1.mouse; } });
var sprite_1 = __webpack_require__(/*! ./sprite */ "./src/sprite.ts");
Object.defineProperty(exports, "sprite", { enumerable: true, get: function () { return sprite_1.default; } });
var vec2_1 = __webpack_require__(/*! ./vec2 */ "./src/vec2.ts");
Object.defineProperty(exports, "vec2", { enumerable: true, get: function () { return vec2_1.default; } });
var storage_1 = __webpack_require__(/*! ./storage */ "./src/storage.ts");
Object.defineProperty(exports, "save", { enumerable: true, get: function () { return storage_1.save; } });
Object.defineProperty(exports, "load", { enumerable: true, get: function () { return storage_1.load; } });
var collision_1 = __webpack_require__(/*! ./collision */ "./src/collision.ts");
Object.defineProperty(exports, "collisions", { enumerable: true, get: function () { return collision_1.default; } });
__exportStar(__webpack_require__(/*! ./types */ "./src/types.ts"), exports);


/***/ }),

/***/ "./src/collision.ts":
/*!**************************!*\
  !*** ./src/collision.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
var bramble_1 = __webpack_require__(/*! ./bramble */ "./src/bramble.ts");
// works
function pointVsRect(point, rect) {
    return (point.x >= rect.x &&
        point.y >= rect.y &&
        point.x < rect.x + rect.width &&
        point.y < rect.y + rect.height);
}
// works
function rectVsRect(rectA, rectB) {
    return (rectA.x < rectB.x + rectB.width &&
        rectA.x + rectA.width > rectB.x &&
        rectA.y < rectB.y + rectB.height &&
        rectA.y + rectA.height > rectB.y);
}
// works
// returns false if no collision occurred, otherwise it returns an object
// containing the results of the collision
// { near, far, normal }
function lineVsRect(line, rect) {
    var from = bramble_1.vec2.create(line.from.x, line.from.y);
    var to = bramble_1.vec2.create(line.to.x, line.to.y);
    var dir = bramble_1.vec2.clone(to);
    dir.subtract(from);
    var invdir = {
        x: 1.0 / dir.x,
        y: 1.0 / dir.y
    };
    var timeNear = {
        x: (rect.x - line.from.x) * invdir.x,
        y: (rect.y - line.from.y) * invdir.y
    };
    var timeFar = {
        x: (rect.x + rect.width - line.from.x) * invdir.x,
        y: (rect.y + rect.height - line.from.y) * invdir.y
    };
    if (isNaN(timeNear.x) || isNaN(timeNear.y)) {
        return false;
    }
    if (isNaN(timeFar.x) || isNaN(timeFar.y)) {
        return false;
    }
    // sort the distances
    var tempNear = __assign({}, timeNear);
    var tempFar = __assign({}, timeFar);
    if (tempNear.x > tempFar.x) {
        timeNear.x = tempFar.x;
        timeFar.x = tempNear.x;
    }
    tempNear = __assign({}, timeNear);
    tempFar = __assign({}, timeFar);
    if (tempNear.y > tempFar.y) {
        timeNear.y = tempFar.y;
        timeFar.y = tempNear.y;
    }
    // no collision detected
    if (timeNear.x > timeFar.y || timeNear.y > timeFar.x) {
        return false;
    }
    var hitNear = Math.max(timeNear.x, timeNear.y);
    var hitFar = Math.min(timeFar.x, timeFar.y);
    // abort if ray is facing away from our object
    if (hitFar < 0) {
        return false;
    }
    // abort if the ray does not reach the object
    if (hitNear > 1) {
        return false;
    }
    // abort if the ray's first collision is behind us
    if (hitNear < 0) {
        return false;
    }
    // construct a vector to hold the normal of the surface
    var normal = bramble_1.vec2.create(0, 0);
    if (timeNear.x > timeNear.y) {
        if (invdir.x < 0) {
            normal.x = 1;
            normal.y = 0;
        }
        else {
            normal.x = -1;
            normal.y = 0;
        }
    }
    else if (timeNear.x < timeNear.y) {
        if (invdir.y < 0) {
            normal.x = 0;
            normal.y = 1;
        }
        else {
            normal.x = 0;
            normal.y = -1;
        }
    }
    else if (timeNear.x === timeNear.y) {
        if (invdir.x < 0 && invdir.y < 0) {
            normal.x = -1;
            normal.y = 1;
        }
        else if (invdir.x > 0 && invdir.y < 0) {
            normal.x = 1;
            normal.y = 1;
        }
        else if (invdir.x < 0 && invdir.y > 0) {
            normal.x = -1;
            normal.y = -1;
        }
        else if (invdir.x > 0 && invdir.y > 0) {
            normal.x = 1;
            normal.y = -1;
        }
    }
    // collided with the object!
    return {
        normal: normal,
        near: bramble_1.vec2.create(from.x + hitNear * dir.x, from.y + hitNear * dir.y),
        far: bramble_1.vec2.create(from.x + hitFar * dir.x, from.y + hitFar * dir.y),
        timeOfCollision: hitNear
    };
}
// a dynamic rect is one that can move - has a velocity
// static rect doesn't move
function dynamicRectVsStaticRect(dynamicRect, staticRect) {
    // assume no collision if the dynamic rect is not moving
    // avoiding using length here because it calculates a square root
    if (dynamicRect.velocity.x === 0 && dynamicRect.velocity.y === 0) {
        return false;
    }
    var halfWidth = dynamicRect.width / 2;
    var halfHeight = dynamicRect.height / 2;
    var clone = bramble_1.vec2.clone(dynamicRect.position);
    clone.add(dynamicRect.velocity);
    clone.x += dynamicRect.width / 2;
    clone.y += dynamicRect.height / 2;
    var line = {
        from: {
            x: dynamicRect.position.x + halfWidth,
            y: dynamicRect.position.y + halfHeight
        },
        to: clone
    };
    var rect = {
        x: staticRect.position.x - halfWidth,
        y: staticRect.position.y - halfHeight,
        width: staticRect.width + dynamicRect.width,
        height: staticRect.height + dynamicRect.height
    };
    return lineVsRect(line, rect);
}
// Compute the value of a point on a cubic Bezier curve at parameter t
function cubicBezierPoint(P0, P1, P2, P3, t) {
    var x = (1 - t) * (1 - t) * (1 - t) * P0.x +
        3 * (1 - t) * (1 - t) * t * P1.x +
        3 * (1 - t) * t * t * P2.x +
        t * t * t * P3.x;
    var y = (1 - t) * (1 - t) * (1 - t) * P0.y +
        3 * (1 - t) * (1 - t) * t * P1.y +
        3 * (1 - t) * t * t * P2.y +
        t * t * t * P3.y;
    return bramble_1.vec2.create(x, y);
}
// Compute the tangent of the curve at parameter t
function cubicBezierTangent(P0, P1, P2, P3, t) {
    var x = 3 * (1 - t) * (1 - t) * (P1.x - P0.x) +
        6 * (1 - t) * t * (P2.x - P1.x) +
        3 * t * t * (P3.x - P2.x);
    var y = 3 * (1 - t) * (1 - t) * (P1.y - P0.y) +
        6 * (1 - t) * t * (P2.y - P1.y) +
        3 * t * t * (P3.y - P2.y);
    return bramble_1.vec2.create(x, y);
}
// Helper function to find the roots of a cubic polynomial using Cardano's formula
function findCubicRoots(A, B, C, D) {
    if (Math.abs(A) < 1e-10) {
        return findQuadraticRoots(B, C, D);
    }
    var a = B / A;
    var b = C / A;
    var c = D / A;
    var p = (3 * b - a * a) / 3;
    var q = (2 * a * a * a - 9 * a * b + 27 * c) / 27;
    var discriminant = (q * q) / 4 + (p * p * p) / 27;
    var roots = [];
    if (discriminant > 0) {
        var u = Math.cbrt(-q / 2 + Math.sqrt(discriminant));
        var v = Math.cbrt(-q / 2 - Math.sqrt(discriminant));
        roots.push(u + v - a / 3);
    }
    else if (discriminant === 0) {
        var u = Math.cbrt(-q / 2);
        roots.push(2 * u - a / 3);
        roots.push(-u - a / 3);
    }
    else {
        var r = Math.sqrt((-p * p * p) / 27);
        var phi = Math.acos(-q / (2 * r));
        roots.push(2 * Math.cbrt(r) * Math.cos(phi / 3) - a / 3);
        roots.push(2 * Math.cbrt(r) * Math.cos((phi + 2 * Math.PI) / 3) - a / 3);
        roots.push(2 * Math.cbrt(r) * Math.cos((phi + 4 * Math.PI) / 3) - a / 3);
    }
    return roots.filter(function (t) { return t >= 0 && t <= 1; });
}
// Helper function to find the roots of a quadratic polynomial
function findQuadraticRoots(A, B, C) {
    var discriminant = B * B - 4 * A * C;
    if (discriminant < 0) {
        return [];
    }
    else if (discriminant === 0) {
        return [-B / (2 * A)];
    }
    else {
        var sqrtDiscriminant = Math.sqrt(discriminant);
        return [
            (-B + sqrtDiscriminant) / (2 * A),
            (-B - sqrtDiscriminant) / (2 * A)
        ];
    }
}
// Find intersection between a ray (defined by two points) and a cubic Bezier curve
function lineVsCubicBezierCurve(P0, P1, P2, P3, R0, R1) {
    var intersections = [];
    // Coefficients of the cubic Bezier curve
    var ax = -P0.x + 3 * P1.x - 3 * P2.x + P3.x;
    var ay = -P0.y + 3 * P1.y - 3 * P2.y + P3.y;
    var bx = 3 * P0.x - 6 * P1.x + 3 * P2.x;
    var by = 3 * P0.y - 6 * P1.y + 3 * P2.y;
    var cx = -3 * P0.x + 3 * P1.x;
    var cy = -3 * P0.y + 3 * P1.y;
    var dx = P0.x;
    var dy = P0.y;
    // Coefficients of the ray
    var rx = R1.x - R0.x;
    var ry = R1.y - R0.y;
    var ex = R0.x;
    var ey = R0.y;
    // Construct the cubic equation: At^3 + Bt^2 + Ct + D = 0
    var A = ax * ry - ay * rx;
    var B = bx * ry - by * rx;
    var C = cx * ry - cy * rx;
    var D = (dx - ex) * ry - (dy - ey) * rx;
    var roots = findCubicRoots(A, B, C, D);
    // Check valid t values and compute intersections
    roots.forEach(function (t) {
        var intersection = cubicBezierPoint(P0, P1, P2, P3, t);
        var tangent = cubicBezierTangent(P0, P1, P2, P3, t);
        var angleRadians = Math.atan2(tangent.y, tangent.x);
        var angleDegrees = angleRadians * (180 / Math.PI);
        var tempvec = bramble_1.vec2.fromDegrees(angleDegrees);
        var normal = bramble_1.vec2.create(tempvec.y, -tempvec.x);
        // Calculate the distance along the ray
        var dx = intersection.x - R0.x;
        var dy = intersection.y - R0.y;
        var distanceToIntersection = Math.sqrt(dx * dx + dy * dy);
        var rayLength = Math.sqrt(rx * rx + ry * ry);
        var remainderLength = rayLength - distanceToIntersection;
        // Ensure the intersection point lies within the ray segment
        var rayParam = (intersection.x - ex) / rx;
        var rayParamY = (intersection.y - ey) / ry;
        if ((rayParam >= 0 && rayParam <= 1) ||
            (rayParamY >= 0 && rayParamY <= 1)) {
            intersections.push({
                point: bramble_1.vec2.create(intersection.x, intersection.y),
                distance: distanceToIntersection,
                remainderLength: remainderLength,
                angleRadians: angleRadians,
                angleDegrees: angleDegrees,
                direction: bramble_1.vec2.fromDegrees(angleDegrees),
                normal: normal
            });
        }
    });
    return intersections;
}
exports.default = {
    dynamicRectVsStaticRect: dynamicRectVsStaticRect,
    rectVsRect: rectVsRect,
    lineVsRect: lineVsRect,
    pointVsRect: pointVsRect,
    lineVsCubicBezierCurve: lineVsCubicBezierCurve
};


/***/ }),

/***/ "./src/game.ts":
/*!*********************!*\
  !*** ./src/game.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var assets_1 = __webpack_require__(/*! ./assets */ "./src/assets.ts");
var graphics_1 = __webpack_require__(/*! ./graphics */ "./src/graphics.ts");
var input_1 = __webpack_require__(/*! ./input */ "./src/input.ts");
var renderer_1 = __webpack_require__(/*! ./renderer */ "./src/renderer.ts");
var sounds_1 = __webpack_require__(/*! ./sounds */ "./src/sounds.ts");
var create = function () {
    var backgroundColor = null;
    var update = null;
    var render = null;
    // used for calculating the Delta Time for the Frame
    var prevTime = 0;
    var canvas = document.createElement('canvas');
    var graphicsContext = canvas.getContext('2d');
    var audioContext = new AudioContext();
    var gfx = graphics_1.default.create(graphicsContext);
    var sfx = sounds_1.default.create(audioContext);
    var assetManager = assets_1.default.create();
    var ren = renderer_1.default.create(graphicsContext);
    canvas.id = 'bramble-game';
    var mouseInput = input_1.mouse.create(canvas);
    var keyboardInput = input_1.keyboard.create(canvas);
    var setBackgroundColor = function (color) {
        backgroundColor = color;
    };
    var attachTo = function (element) {
        element.appendChild(canvas);
    };
    var setUpdate = function (callback) {
        update = callback;
    };
    var setRender = function (callback) {
        render = callback;
    };
    var inputState = {
        keyboard: keyboardInput.getState(),
        mouse: mouseInput.getState(),
    };
    var step = function () {
        if (update) {
            inputState.keyboard = keyboardInput.getState();
            inputState.mouse = mouseInput.getState();
            update({
                dt: (performance.now() - prevTime) / 1000,
                input: inputState,
                sfx: sfx,
                assets: assetManager.assets
            });
        }
        if (render) {
            if (backgroundColor) {
                gfx.clear(backgroundColor);
            }
            render({ gfx: ren, assets: assetManager.assets });
            ren.render();
        }
        mouseInput.update();
        keyboardInput.update();
        window.requestAnimationFrame(step);
        prevTime = performance.now();
    };
    var start = function () {
        mouseInput.start();
        keyboardInput.start();
        window.requestAnimationFrame(step);
    };
    var setSize = function (width, height) {
        canvas.width = width;
        canvas.height = height;
    };
    // Smoothing must be re-applied if any of the following is called
    //   - setSize
    var setSmoothing = function (to) {
        if (to === void 0) { to = true; }
        graphicsContext.imageSmoothingEnabled = to;
    };
    var disableContextMenu = function () {
        canvas.addEventListener('contextmenu', function (e) {
            e.preventDefault();
        });
    };
    var stop = function () {
        canvas.remove();
    };
    return {
        attachTo: attachTo,
        setSize: setSize,
        setUpdate: setUpdate,
        setRender: setRender,
        setBackgroundColor: setBackgroundColor,
        canvas: canvas,
        disableContextMenu: disableContextMenu,
        setSmoothing: setSmoothing,
        start: start,
        stop: stop,
        assets: assetManager
    };
};
exports.default = {
    create: create
};


/***/ }),

/***/ "./src/graphics.ts":
/*!*************************!*\
  !*** ./src/graphics.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var clear_1 = __webpack_require__(/*! ./graphics/clear */ "./src/graphics/clear.ts");
var defaults_1 = __webpack_require__(/*! ./graphics/defaults */ "./src/graphics/defaults.ts");
var effects_1 = __webpack_require__(/*! ./graphics/effects */ "./src/graphics/effects.ts");
var images_1 = __webpack_require__(/*! ./graphics/images */ "./src/graphics/images.ts");
var shapes_1 = __webpack_require__(/*! ./graphics/shapes */ "./src/graphics/shapes.ts");
var text_1 = __webpack_require__(/*! ./graphics/text */ "./src/graphics/text.ts");
var tiles_1 = __webpack_require__(/*! ./graphics/tiles */ "./src/graphics/tiles.ts");
var transforms_1 = __webpack_require__(/*! ./graphics/transforms */ "./src/graphics/transforms.ts");
var sprites_1 = __webpack_require__(/*! ./graphics/sprites */ "./src/graphics/sprites.ts");
var clear_2 = __webpack_require__(/*! ./graphics/clear */ "./src/graphics/clear.ts");
function create(ctx) {
    return {
        circle: function (position, radius, options) {
            if (options === void 0) { options = defaults_1.defaultCircle; }
            (0, shapes_1.circle)(ctx, position, radius, options);
        },
        clear: function (colour) {
            (0, clear_2.clear)(ctx, colour);
        },
        clearRect: function (rectangle, colour) {
            (0, clear_1.clearRect)(ctx, rectangle, colour);
        },
        curve: function (from, to, controlPoints, options) {
            (0, shapes_1.curve)(ctx, from, to, controlPoints, options);
        },
        square: function (position, size, options) {
            if (options === void 0) { options = defaults_1.defaultRect; }
            (0, shapes_1.square)(ctx, position, size, options);
        },
        rect: function (rectangle, options) {
            if (options === void 0) { options = defaults_1.defaultRect; }
            (0, shapes_1.rect)(ctx, rectangle, options);
        },
        image: function (img, position, size) {
            (0, images_1.image)(ctx, img, position, size);
        },
        line: function (from, to, options) {
            if (options === void 0) { options = defaults_1.defaultLine; }
            (0, shapes_1.line)(ctx, from, to, options);
        },
        sprite: function (spr) {
            (0, sprites_1.sprite)(ctx, spr);
        },
        subImage: function (img, position, size, subPosition, subSize) {
            (0, images_1.subImage)(ctx, img, position, size, subPosition, subSize);
        },
        text: function (position, text, options) {
            if (position === void 0) { position = { x: 0, y: 0 }; }
            if (text === void 0) { text = ''; }
            if (options === void 0) { options = defaults_1.defaultText; }
            (0, text_1.txt)(ctx, position, text, options);
        },
        tiles: function (position, tileGrid, spriteSheets, scale) {
            (0, tiles_1.tiles)(ctx, position, tileGrid, spriteSheets, scale);
        },
        shadow: function (drawingOperations, options) {
            if (options === void 0) { options = defaults_1.defaultDropShadow; }
            (0, effects_1.shadow)(ctx, drawingOperations, options);
        },
        dodge: function (drawingOperations) {
            (0, effects_1.dodge)(ctx, drawingOperations);
        },
        overlay: function (drawingOperations) {
            (0, effects_1.overlay)(ctx, drawingOperations);
        },
        transparency: function (drawingOperations, alpha) {
            if (alpha === void 0) { alpha = 0.25; }
            (0, effects_1.transparency)(ctx, drawingOperations, alpha);
        },
        rotation: function (drawingOperations, rotateBy, around) {
            if (rotateBy === void 0) { rotateBy = 0; }
            if (around === void 0) { around = { x: 0, y: 0 }; }
            (0, transforms_1.rotation)(ctx, drawingOperations, rotateBy, around);
        },
        transform: function (drawingOperations, options) {
            if (options === void 0) { options = defaults_1.defaultTransform; }
            (0, transforms_1.transform)(ctx, drawingOperations, options);
        },
        scale: function (drawingOperations, options) {
            (0, transforms_1.scale)(ctx, drawingOperations, options);
        },
        multiply: function (drawingOperations) {
            (0, effects_1.multiply)(ctx, drawingOperations);
        },
        screen: function (drawingOperations) {
            (0, effects_1.screen)(ctx, drawingOperations);
        },
        blur: function (drawingOperations, radius) {
            if (radius === void 0) { radius = 4; }
            (0, effects_1.blur)(ctx, drawingOperations, radius);
        },
        colourShift: function (drawingOperations, options) {
            if (options === void 0) { options = effects_1.defaultColourShift; }
            (0, effects_1.colourShift)(ctx, drawingOperations, options);
        },
        strokeGlow: function (drawingOperations, options) {
            if (options === void 0) { options = effects_1.defaultStrokeGlow; }
            (0, effects_1.strokeGlow)(ctx, drawingOperations, options);
        }
    };
}
exports.default = {
    circle: shapes_1.circle,
    clear: clear_2.clear,
    clearRect: clear_1.clearRect,
    create: create,
    curve: shapes_1.curve,
    dodge: effects_1.dodge,
    image: images_1.image,
    line: shapes_1.line,
    overlay: effects_1.overlay,
    rotation: transforms_1.rotation,
    rect: shapes_1.rect,
    shadow: effects_1.shadow,
    sprite: sprites_1.sprite,
    square: shapes_1.square,
    subImage: images_1.subImage,
    text: text_1.txt,
    tiles: tiles_1.tiles,
    transparency: effects_1.transparency,
    transform: transforms_1.transform,
    multiply: effects_1.multiply,
    screen: effects_1.screen,
    blur: effects_1.blur,
    colourShift: effects_1.colourShift,
    strokeGlow: effects_1.strokeGlow
};


/***/ }),

/***/ "./src/graphics/clear.ts":
/*!*******************************!*\
  !*** ./src/graphics/clear.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.clearRect = exports.clear = void 0;
var shapes_1 = __webpack_require__(/*! ./shapes */ "./src/graphics/shapes.ts");
function clear(ctx, colour) {
    if (!colour) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }
    else {
        (0, shapes_1.rect)(ctx, { x: 0, y: 0, width: ctx.canvas.width, height: ctx.canvas.height }, {
            fill: { colour: colour },
            line: { width: 0 }
        });
    }
}
exports.clear = clear;
function clearRect(ctx, rectangle, colour) {
    if (!colour) {
        ctx.clearRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
    }
    else {
        (0, shapes_1.rect)(ctx, rectangle, {
            fill: { colour: colour },
            line: { width: 0 }
        });
    }
}
exports.clearRect = clearRect;


/***/ }),

/***/ "./src/graphics/common.ts":
/*!********************************!*\
  !*** ./src/graphics/common.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.freshContext = void 0;
function freshContext(ctx, callback) {
    ctx.save();
    callback();
    ctx.restore();
}
exports.freshContext = freshContext;


/***/ }),

/***/ "./src/graphics/defaults.ts":
/*!**********************************!*\
  !*** ./src/graphics/defaults.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultTransform = exports.defaultText = exports.defaultCircle = exports.defaultLine = exports.defaultRect = exports.defaultDropShadow = void 0;
exports.defaultDropShadow = {
    shadowColour: '#000000',
    shadowBlur: 6,
    shadowOffsetX: 4,
    shadowOffsetY: 4
};
exports.defaultRect = {
    fill: {
        colour: '#000000',
        opacity: 1
    },
    line: {
        width: 1,
        colour: '#FFFFFF',
        opacity: 1
    }
};
exports.defaultLine = {
    width: 1,
    colour: '#FFFFFF',
    opacity: 1
};
exports.defaultCircle = {
    fill: {
        colour: '#000000',
        opacity: 1
    },
    line: {
        colour: '#FFFFFF',
        opacity: 1,
        width: 1
    }
};
exports.defaultText = {
    colour: '#000000',
    size: '16pt',
    family: 'sans-serif',
    align: 'left',
    baseline: 'top'
};
exports.defaultTransform = {
    rotation: 0,
    scale: 1,
    around: { x: 0, y: 0 }
};


/***/ }),

/***/ "./src/graphics/effects.ts":
/*!*********************************!*\
  !*** ./src/graphics/effects.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.strokeGlow = exports.defaultStrokeGlow = exports.colourShift = exports.defaultColourShift = exports.blur = exports.screen = exports.multiply = exports.transparency = exports.overlay = exports.dodge = exports.shadow = void 0;
var object_1 = __webpack_require__(/*! ../utils/object */ "./src/utils/object.ts");
var common_1 = __webpack_require__(/*! ./common */ "./src/graphics/common.ts");
var defaults_1 = __webpack_require__(/*! ./defaults */ "./src/graphics/defaults.ts");
function shadow(ctx, drawingOperations, options) {
    if (options === void 0) { options = defaults_1.defaultDropShadow; }
    (0, common_1.freshContext)(ctx, function () {
        options = (0, object_1.merge)(defaults_1.defaultDropShadow, options);
        ctx.shadowColor = options.shadowColour;
        ctx.shadowBlur = options.shadowBlur;
        ctx.shadowOffsetX = options.shadowOffsetX;
        ctx.shadowOffsetY = options.shadowOffsetY;
        drawingOperations();
    });
}
exports.shadow = shadow;
function dodge(ctx, drawingOperations) {
    (0, common_1.freshContext)(ctx, function () {
        ctx.globalCompositeOperation = 'color-dodge';
        drawingOperations();
    });
}
exports.dodge = dodge;
function overlay(ctx, drawingOperations) {
    (0, common_1.freshContext)(ctx, function () {
        ctx.globalCompositeOperation = 'overlay';
        drawingOperations();
    });
}
exports.overlay = overlay;
function transparency(ctx, drawingOperations, alpha) {
    if (alpha === void 0) { alpha = 0.25; }
    (0, common_1.freshContext)(ctx, function () {
        ctx.globalAlpha *= alpha;
        drawingOperations();
    });
}
exports.transparency = transparency;
function multiply(ctx, drawingOperations) {
    (0, common_1.freshContext)(ctx, function () {
        ctx.globalCompositeOperation = 'multiply';
        drawingOperations();
    });
}
exports.multiply = multiply;
function screen(ctx, drawingOperations) {
    (0, common_1.freshContext)(ctx, function () {
        ctx.globalCompositeOperation = 'screen';
        drawingOperations();
    });
}
exports.screen = screen;
function blur(ctx, drawingOperations, radius // default blur radius in px
) {
    if (radius === void 0) { radius = 4; }
    // freshContext(ctx, () => {
    ctx.filter = "blur(".concat(radius, "px)");
    drawingOperations();
    // })
}
exports.blur = blur;
exports.defaultColourShift = {
    hue: 0,
    saturate: 1
};
function colourShift(ctx, drawingOperations, options) {
    if (options === void 0) { options = exports.defaultColourShift; }
    (0, common_1.freshContext)(ctx, function () {
        var hue = options.hue, saturate = options.saturate;
        ctx.filter = "hue-rotate(".concat(hue, "deg) saturate(").concat(saturate, ")");
        drawingOperations();
    });
}
exports.colourShift = colourShift;
exports.defaultStrokeGlow = {
    color: 'white',
    blur: 8
};
function strokeGlow(ctx, drawingOperations, options) {
    if (options === void 0) { options = exports.defaultStrokeGlow; }
    (0, common_1.freshContext)(ctx, function () {
        var _a, _b;
        ctx.shadowColor = (_a = options.color) !== null && _a !== void 0 ? _a : 'white';
        ctx.shadowBlur = (_b = options.blur) !== null && _b !== void 0 ? _b : 8;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        drawingOperations();
    });
}
exports.strokeGlow = strokeGlow;


/***/ }),

/***/ "./src/graphics/images.ts":
/*!********************************!*\
  !*** ./src/graphics/images.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.subImage = exports.image = void 0;
function image(ctx, image, position, size) {
    if (size) {
        ctx.drawImage(image, position.x, position.y, size.width, size.height);
    }
    else {
        ctx.drawImage(image, position.x, position.y, image.width, image.height);
    }
}
exports.image = image;
function subImage(ctx, image, position, size, subPosition, subSize) {
    ctx.drawImage(image, subPosition.x, subPosition.y, subSize.width, subSize.height, position.x, position.y, size.width, size.height);
}
exports.subImage = subImage;


/***/ }),

/***/ "./src/graphics/shape_utils.ts":
/*!*************************************!*\
  !*** ./src/graphics/shape_utils.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.shouldSinglePass = exports.shouldDrawFill = exports.shouldDrawOutline = exports.shouldDrawLine = void 0;
function shouldDrawLine(options) {
    return options.opacity !== 0 && options.width !== 0;
}
exports.shouldDrawLine = shouldDrawLine;
function shouldDrawOutline(options) {
    return options.line.opacity !== 0 && options.line.width !== 0;
}
exports.shouldDrawOutline = shouldDrawOutline;
function shouldDrawFill(options) {
    return options.fill.opacity !== 0;
}
exports.shouldDrawFill = shouldDrawFill;
function shouldSinglePass(options) {
    return options.fill.opacity === 1 && options.line.opacity === 1 && options.line.width > 0;
}
exports.shouldSinglePass = shouldSinglePass;


/***/ }),

/***/ "./src/graphics/shapes.ts":
/*!********************************!*\
  !*** ./src/graphics/shapes.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.path = exports.circle = exports.curve = exports.quadratic = exports.bezier = exports.line = exports.rect = exports.square = void 0;
var object_1 = __webpack_require__(/*! ../utils/object */ "./src/utils/object.ts");
var defaults_1 = __webpack_require__(/*! ./defaults */ "./src/graphics/defaults.ts");
var effects_1 = __webpack_require__(/*! ./effects */ "./src/graphics/effects.ts");
var shape_utils_1 = __webpack_require__(/*! ./shape_utils */ "./src/graphics/shape_utils.ts");
function square(ctx, position, size, options) {
    if (options === void 0) { options = defaults_1.defaultRect; }
    rect(ctx, { x: position.x, y: position.y, width: size, height: size }, options);
}
exports.square = square;
function rectOutline(ctx, rectangle, options) {
    ctx.strokeStyle = options.line.colour;
    ctx.lineWidth = options.line.width;
    ctx.strokeRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
}
function rectFill(ctx, rectangle, options) {
    ctx.fillStyle = options.fill.colour;
    ctx.fillRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
}
function rectCombined(ctx, rectangle, options) {
    ctx.fillStyle = options.fill.colour;
    ctx.strokeStyle = options.line.colour;
    ctx.lineWidth = options.line.width;
    ctx.fillRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
    ctx.strokeRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
}
function rect(ctx, rectangle, options) {
    if (options === void 0) { options = defaults_1.defaultRect; }
    options = (0, object_1.merge)(defaults_1.defaultRect, options);
    if ((0, shape_utils_1.shouldSinglePass)(options)) {
        rectCombined(ctx, rectangle, options);
    }
    else {
        if ((0, shape_utils_1.shouldDrawFill)(options)) {
            (0, effects_1.transparency)(ctx, function () { return rectFill(ctx, rectangle, options); }, options.fill.opacity);
        }
        if ((0, shape_utils_1.shouldDrawOutline)(options)) {
            (0, effects_1.transparency)(ctx, function () { return rectOutline(ctx, rectangle, options); }, options.line.opacity);
        }
    }
}
exports.rect = rect;
function line(ctx, from, to, options) {
    if (options === void 0) { options = defaults_1.defaultLine; }
    options = (0, object_1.merge)(defaults_1.defaultLine, options);
    if ((0, shape_utils_1.shouldDrawLine)(options)) {
        (0, effects_1.transparency)(ctx, function () {
            ctx.strokeStyle = options.colour;
            ctx.lineWidth = options.width;
            ctx.beginPath();
            ctx.moveTo(from.x, from.y);
            ctx.lineTo(to.x, to.y);
            ctx.stroke();
            ctx.closePath();
        }, options.opacity);
    }
}
exports.line = line;
function bezier(ctx, from, to, cp1, cp2, options) {
    if (options === void 0) { options = defaults_1.defaultLine; }
    options = (0, object_1.merge)(defaults_1.defaultLine, options);
    if ((0, shape_utils_1.shouldDrawLine)(options)) {
        (0, effects_1.transparency)(ctx, function () {
            ctx.strokeStyle = options.colour;
            ctx.lineWidth = options.width;
            ctx.beginPath();
            ctx.moveTo(from.x, from.y);
            ctx.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, to.x, to.y);
            ctx.stroke();
            ctx.closePath();
        }, options.opacity);
    }
}
exports.bezier = bezier;
function quadratic(ctx, from, to, cp, options) {
    if (options === void 0) { options = defaults_1.defaultLine; }
    options = (0, object_1.merge)(defaults_1.defaultLine, options);
    if ((0, shape_utils_1.shouldDrawLine)(options)) {
        (0, effects_1.transparency)(ctx, function () {
            ctx.strokeStyle = options.colour;
            ctx.lineWidth = options.width;
            ctx.beginPath();
            ctx.moveTo(from.x, from.y);
            ctx.quadraticCurveTo(cp.x, cp.y, to.x, to.y);
            ctx.stroke();
            ctx.closePath();
        });
    }
}
exports.quadratic = quadratic;
function curve(ctx, from, to, controlPoints, options) {
    if (options === void 0) { options = defaults_1.defaultLine; }
    if (controlPoints.cp1 && controlPoints.cp2) {
        bezier(ctx, from, to, controlPoints.cp1, controlPoints.cp2, options);
    }
    else if (controlPoints.cp1 && !controlPoints.cp2) {
        quadratic(ctx, from, to, controlPoints.cp1, options);
    }
    else {
        line(ctx, from, to, options);
    }
}
exports.curve = curve;
function circleOutline(ctx, position, radius, options) {
    ctx.strokeStyle = options.line.colour;
    ctx.lineWidth = options.line.width;
    ctx.beginPath();
    ctx.arc(position.x, position.y, radius, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.stroke();
}
function circleFill(ctx, position, radius, options) {
    ctx.fillStyle = options.fill.colour;
    ctx.beginPath();
    ctx.arc(position.x, position.y, radius, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
}
function circleCombined(ctx, position, radius, options) {
    ctx.fillStyle = options.fill.colour;
    ctx.strokeStyle = options.line.colour;
    ctx.lineWidth = options.line.width;
    ctx.beginPath();
    ctx.arc(position.x, position.y, radius, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
}
function circle(ctx, position, radius, options) {
    if (options === void 0) { options = defaults_1.defaultCircle; }
    options = (0, object_1.merge)(defaults_1.defaultCircle, options);
    if ((0, shape_utils_1.shouldSinglePass)(options)) {
        circleCombined(ctx, position, radius, options);
    }
    else {
        if ((0, shape_utils_1.shouldDrawFill)(options)) {
            (0, effects_1.transparency)(ctx, function () { return circleFill(ctx, position, radius, options); }, options.fill.opacity);
        }
        if ((0, shape_utils_1.shouldDrawOutline)(options)) {
            (0, effects_1.transparency)(ctx, function () { return circleOutline(ctx, position, radius, options); }, options.line.opacity);
        }
    }
}
exports.circle = circle;
function path(ctx, operations, options) {
    if (options === void 0) { options = defaults_1.defaultLine; }
    options = (0, object_1.merge)(defaults_1.defaultLine, options);
    if ((0, shape_utils_1.shouldDrawLine)(options)) {
        (0, effects_1.transparency)(ctx, function () {
            ctx.globalAlpha = options.opacity;
            ctx.strokeStyle = options.colour;
            ctx.lineWidth = options.width;
            ctx.beginPath();
            operations();
            ctx.stroke();
        }, options.opacity);
    }
}
exports.path = path;


/***/ }),

/***/ "./src/graphics/sprites.ts":
/*!*********************************!*\
  !*** ./src/graphics/sprites.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.sprite = void 0;
var number_1 = __webpack_require__(/*! ../utils/number */ "./src/utils/number.ts");
var common_1 = __webpack_require__(/*! ./common */ "./src/graphics/common.ts");
var images_1 = __webpack_require__(/*! ./images */ "./src/graphics/images.ts");
function sprite(ctx, sprite) {
    (0, common_1.freshContext)(ctx, function () {
        var halfWidth = sprite.size.width / 2;
        var halfHeight = sprite.size.height / 2;
        ctx.translate(sprite.position.x + halfWidth, sprite.position.y + halfHeight);
        ctx.rotate(number_1.default.toRadians(sprite.rotation));
        if (sprite.frames.length > 1) {
            (0, images_1.subImage)(ctx, sprite.texture, {
                x: -halfWidth,
                y: -halfHeight
            }, {
                width: sprite.size.width,
                height: sprite.size.height
            }, {
                x: sprite.frames[sprite.frame].position.x,
                y: sprite.frames[sprite.frame].position.y
            }, {
                width: sprite.frames[sprite.frame].size.width,
                height: sprite.frames[sprite.frame].size.height
            });
        }
        else {
            (0, images_1.image)(ctx, sprite.texture, {
                x: -halfWidth,
                y: -halfHeight
            }, {
                width: sprite.size.width,
                height: sprite.size.height
            });
        }
    });
}
exports.sprite = sprite;


/***/ }),

/***/ "./src/graphics/text.ts":
/*!******************************!*\
  !*** ./src/graphics/text.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.txt = void 0;
var object_1 = __webpack_require__(/*! ../utils/object */ "./src/utils/object.ts");
var common_1 = __webpack_require__(/*! ./common */ "./src/graphics/common.ts");
var defaults_1 = __webpack_require__(/*! ./defaults */ "./src/graphics/defaults.ts");
function txt(ctx, position, text, options) {
    if (text === void 0) { text = ''; }
    if (options === void 0) { options = defaults_1.defaultText; }
    (0, common_1.freshContext)(ctx, function () {
        options = (0, object_1.merge)(defaults_1.defaultText, options);
        ctx.fillStyle = options.colour;
        ctx.font = "".concat(options.size, " ").concat(options.family);
        ctx.textAlign = options.align;
        ctx.textBaseline = options.baseline;
        ctx.fillText(text, position.x, position.y);
    });
}
exports.txt = txt;


/***/ }),

/***/ "./src/graphics/tiles.ts":
/*!*******************************!*\
  !*** ./src/graphics/tiles.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.tiles = exports.tile = void 0;
var images_1 = __webpack_require__(/*! ./images */ "./src/graphics/images.ts");
function tile(ctx, position, tilesheet, gridPosition, tilesheetPosition, scale, tileSize) {
    (0, images_1.subImage)(ctx, tilesheet, {
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
    });
}
exports.tile = tile;
// tilegrid: a 2d array of numbers representing terrain types
// spritesheets: An object, each key is the value that represents a tile from this sheet
function tiles(ctx, position, tileGrid, spriteSheets, scale) {
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
                console.error("Sheet ".concat(tileGrid[y][x], " not found!"));
                return { value: void 0 };
            }
            var selections = sheet.tiles.filter(function (x) { return x.type === sum; });
            // Note: Just picking a random one of the variants every time we render for now
            var selection = selections[Math.floor(Math.random() * selections.length)];
            if (selection) {
                tile(ctx, position, sheet.image, { x: x, y: y }, selection.position, scale, selection.size);
            }
            else {
                console.error("Tile not defined ".concat(sum));
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
exports.tiles = tiles;


/***/ }),

/***/ "./src/graphics/transforms.ts":
/*!************************************!*\
  !*** ./src/graphics/transforms.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.transform = exports.scale = exports.rotation = void 0;
var number_1 = __webpack_require__(/*! ../utils/number */ "./src/utils/number.ts");
var object_1 = __webpack_require__(/*! ../utils/object */ "./src/utils/object.ts");
var common_1 = __webpack_require__(/*! ./common */ "./src/graphics/common.ts");
var defaults_1 = __webpack_require__(/*! ./defaults */ "./src/graphics/defaults.ts");
function rotation(ctx, drawingOperations, rotation, around) {
    (0, common_1.freshContext)(ctx, function () {
        ctx.translate(around.x, around.y);
        ctx.rotate(number_1.default.toRadians(rotation));
        ctx.translate(-around.x, -around.y);
        drawingOperations();
    });
}
exports.rotation = rotation;
function scale(ctx, drawingOperations, factor, around) {
    if (around === void 0) { around = { x: 0, y: 0 }; }
    (0, common_1.freshContext)(ctx, function () {
        ctx.translate(around.x, around.y);
        if (typeof factor === 'number')
            ctx.scale(factor, factor);
        else
            ctx.scale(factor.x, factor.y);
        ctx.translate(-around.x, -around.y);
        drawingOperations();
    });
}
exports.scale = scale;
function transform(ctx, drawingOperations, options) {
    if (options === void 0) { options = defaults_1.defaultTransform; }
    options = (0, object_1.merge)(defaults_1.defaultTransform, options);
    scale(ctx, function () {
        rotation(ctx, drawingOperations, options.rotation, options.around);
    }, options.scale, options.around);
}
exports.transform = transform;


/***/ }),

/***/ "./src/grid.ts":
/*!*********************!*\
  !*** ./src/grid.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
function create(size, options) {
    if (options === void 0) { options = defaultGrid; }
    options = __assign(__assign({}, defaultGrid), options);
    var tiles = make2DArray(size.width, size.height, 0);
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
        size: size,
        tileSize: tileSize,
        scale: scale
    };
}
exports.default = {
    create: create,
    fill: fill,
    copyTiles: copyTiles
};


/***/ }),

/***/ "./src/input.ts":
/*!**********************!*\
  !*** ./src/input.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.gamepad = exports.keyboard = exports.mouse = void 0;
var mouse_1 = __webpack_require__(/*! ./input/mouse */ "./src/input/mouse.ts");
var keyboard_1 = __webpack_require__(/*! ./input/keyboard */ "./src/input/keyboard.ts");
var gamepad_1 = __webpack_require__(/*! ./input/gamepad */ "./src/input/gamepad.ts");
function createMouse(canvas) {
    var mouseInput = mouse_1.default.create(canvas);
    return {
        start: function () { return mouseInput.start(); },
        update: function () { return mouseInput.update(); },
        getState: function () { return mouseInput.getState(); }
    };
}
function createKeyboard(canvas) {
    var keyboardInput = keyboard_1.default.create(canvas);
    return {
        start: function () { return keyboardInput.start(); },
        update: function () { return keyboardInput.update(); },
        getState: function () { return keyboardInput.getState(); }
    };
}
function createGamepad() {
    var gamepadInput = gamepad_1.default.create();
    return {
        start: function () { return gamepadInput.start(); },
        update: function () { return gamepadInput.update(); },
        getState: function () { return gamepadInput.getState(); }
    };
}
exports.mouse = {
    create: createMouse
};
exports.keyboard = {
    create: createKeyboard
};
exports.gamepad = {
    create: createGamepad
};


/***/ }),

/***/ "./src/input/gamepad.ts":
/*!******************************!*\
  !*** ./src/input/gamepad.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function create() {
    var gamepad = {};
    var connected = function (e) {
        console.info(e.gamepad);
    };
    var disconnected = function (e) {
        console.info(e.gamepad);
    };
    var start = function () {
        window.addEventListener('gamepadconnected', connected);
        window.addEventListener('gamepaddisconnected', disconnected);
    };
    var update = function () { };
    return {
        getState: function () { return gamepad; },
        start: start,
        update: update
    };
}
exports.default = { create: create };


/***/ }),

/***/ "./src/input/keyboard.ts":
/*!*******************************!*\
  !*** ./src/input/keyboard.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
var keys_1 = __webpack_require__(/*! ./keys */ "./src/input/keys.ts");
var keys = defaultState();
function defaultState() {
    var defaultState = {
        pressed: false,
        justPressed: false,
        released: false,
        justReleased: false
    };
    return keys_1.default.reduce(function (acc, key) {
        var label = key.name;
        delete key['label'];
        acc[label] = __assign(__assign({}, key), defaultState);
        return acc;
    }, {});
}
function getKey(event, keys) {
    var result = null;
    var objectKeys = Object.keys(keys);
    for (var i = 0; i < objectKeys.length; i++) {
        if (keys[objectKeys[i]].code === event.code) {
            result = keys[objectKeys[i]];
        }
    }
    if (!result) {
        console.error("No key definition found for ".concat(event.code));
    }
    return result;
}
function preventDefaultArrows(event) {
    var keys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '];
    if (keys.includes(event.key)) {
        event.preventDefault();
    }
}
function down(event) {
    preventDefaultArrows(event);
    var key = getKey(event, keys);
    if (!key.pressed) {
        key.justPressed = true;
    }
    key.pressed = true;
}
function up(event) {
    var key = getKey(event, keys);
    if (!key.released) {
        key.justReleased = true;
    }
    key.pressed = false;
    key.released = true;
}
function update() {
    // reset the keys "just" properties
    Object.keys(keys).forEach(function (key) {
        keys[key].justPressed = false;
        keys[key].justReleased = false;
    });
}
function create(canvas) {
    var start = function () {
        // keyboard events
        canvas.addEventListener('keydown', down);
        canvas.addEventListener('keyup', up);
    };
    return {
        start: start,
        update: update,
        getState: function () { return keys; }
    };
}
exports.default = { create: create };


/***/ }),

/***/ "./src/input/keys.ts":
/*!***************************!*\
  !*** ./src/input/keys.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var allKeys = [
    { code: 'Backspace', name: 'backspace' },
    { code: 'Tab', name: 'tab' },
    { code: 'Enter', name: 'enter' },
    { code: 'ShiftLeft', name: 'shiftLeft' },
    { code: 'ShiftRight', name: 'shiftRight' },
    { code: 'ControlLeft', name: 'ctrlLeft' },
    { code: 'ControlRight', name: 'ctrlRight' },
    { code: 'AltLeft', name: 'altLeft' },
    { code: 'AltRight', name: 'altRight' },
    { code: 'CapsLock', name: 'caps' },
    { code: 'Escape', name: 'escape' },
    { code: 'Space', name: 'space' },
    { code: 'PageUp', name: 'pageUp' },
    { code: 'PageDown', name: 'pageDown' },
    { code: 'End', name: 'end' },
    { code: 'Home', name: 'home' },
    { code: 'ArrowLeft', name: 'left' },
    { code: 'ArrowUp', name: 'up' },
    { code: 'ArrowRight', name: 'right' },
    { code: 'ArrowDown', name: 'down' },
    { code: 'Insert', name: 'insert' },
    { code: 'Delete', name: 'delete' },
    { code: 'Digit0', name: 'zero' },
    { code: 'Digit1', name: 'one' },
    { code: 'Digit2', name: 'two' },
    { code: 'Digit3', name: 'three' },
    { code: 'Digit4', name: 'four' },
    { code: 'Digit5', name: 'five' },
    { code: 'Digit6', name: 'six' },
    { code: 'Digit7', name: 'seven' },
    { code: 'Digit8', name: 'eight' },
    { code: 'Digit9', name: 'nine' },
    { code: 'KeyA', name: 'A' },
    { code: 'KeyB', name: 'B' },
    { code: 'KeyC', name: 'C' },
    { code: 'KeyD', name: 'D' },
    { code: 'KeyE', name: 'E' },
    { code: 'KeyF', name: 'F' },
    { code: 'KeyG', name: 'G' },
    { code: 'KeyH', name: 'H' },
    { code: 'KeyI', name: 'I' },
    { code: 'KeyJ', name: 'J' },
    { code: 'KeyK', name: 'K' },
    { code: 'KeyL', name: 'L' },
    { code: 'KeyM', name: 'M' },
    { code: 'KeyN', name: 'N' },
    { code: 'KeyO', name: 'O' },
    { code: 'KeyP', name: 'P' },
    { code: 'KeyQ', name: 'Q' },
    { code: 'KeyR', name: 'R' },
    { code: 'KeyS', name: 'S' },
    { code: 'KeyT', name: 'T' },
    { code: 'KeyU', name: 'U' },
    { code: 'KeyV', name: 'V' },
    { code: 'KeyW', name: 'W' },
    { code: 'KeyX', name: 'X' },
    { code: 'KeyY', name: 'Y' },
    { code: 'KeyZ', name: 'Z' },
    { code: 'OSLeft', name: 'superLeft' },
    { code: 'OSRight', name: 'superRight' },
    { code: 'ContextMenu', name: 'menu' },
    { code: 'Numpad0', name: 'num0' },
    { code: 'Numpad1', name: 'num1' },
    { code: 'Numpad2', name: 'num2' },
    { code: 'Numpad3', name: 'num3' },
    { code: 'Numpad4', name: 'num4' },
    { code: 'Numpad5', name: 'num5' },
    { code: 'Numpad6', name: 'num6' },
    { code: 'Numpad7', name: 'num7' },
    { code: 'Numpad8', name: 'num8' },
    { code: 'Numpad9', name: 'num9' },
    { code: 'NumpadMultiply', name: 'multiply' },
    { code: 'NumpadAdd', name: 'add' },
    { code: 'NumpadDivide', name: 'divide' },
    { code: 'NumpadDecimal', name: 'point' },
    { code: 'NumpadMinus', name: 'minus' },
    { code: 'NumpadEnter', name: 'numEnter' },
    { code: 'F1', name: 'F1' },
    { code: 'F2', name: 'F2' },
    { code: 'F3', name: 'F3' },
    { code: 'F4', name: 'F4' },
    { code: 'F5', name: 'F5' },
    { code: 'F6', name: 'F6' },
    { code: 'F7', name: 'F7' },
    { code: 'F8', name: 'F8' },
    { code: 'F9', name: 'F9' },
    { code: 'F10', name: 'F10' },
    { code: 'F11', name: 'F11' },
    { code: 'F12', name: 'F12' },
    { code: 'NumLock', name: 'numLock' },
    { code: 'ScrollLock', name: 'scrollLock' },
    { code: 'Semicolon', name: 'semiColon' },
    { code: 'Equal', name: 'equals' },
    { code: 'Comma', name: 'comma' },
    { code: 'Minus', name: 'dash' },
    { code: 'Period', name: 'dot' },
    { code: 'Slash', name: 'slash' },
    { code: 'Backquote', name: 'backtick' },
    { code: 'Backslash', name: 'backSlash' },
    { code: 'IntlBackslash', name: 'intlBackslash' },
    { code: 'BracketLeft', name: 'openBracket' },
    { code: 'BracketRight', name: 'closeBracket' },
    { code: 'Quote', name: 'quote' },
    { code: 'MetaLeft', name: 'metaLeft' },
    { code: 'MetaRight', name: 'metaRight' }
];
exports.default = allKeys;


/***/ }),

/***/ "./src/input/mouse.ts":
/*!****************************!*\
  !*** ./src/input/mouse.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
            position: { x: 0, y: 0 },
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
        mouse.position = newPos;
    };
    var down = function (event) {
        switch (event.which) {
            case 1:
                if (!mouse.left.pressed) {
                    mouse.left.justPressed = true;
                }
                mouse.left.pressed = true;
                break;
            case 2:
                if (!mouse.wheel.pressed) {
                    mouse.wheel.justPressed = true;
                }
                mouse.wheel.pressed = true;
                break;
            case 3:
                if (!mouse.right.pressed) {
                    mouse.right.justPressed = true;
                }
                mouse.right.pressed = true;
                break;
        }
    };
    var up = function (event) {
        switch (event.which) {
            case 1:
                if (!mouse.left.released) {
                    mouse.left.justReleased = true;
                }
                mouse.left.released = true;
                mouse.left.pressed = false;
                break;
            case 2:
                if (!mouse.wheel.released) {
                    mouse.wheel.justReleased = true;
                }
                mouse.wheel.released = true;
                mouse.wheel.pressed = false;
                break;
            case 3:
                if (!mouse.right.released) {
                    mouse.right.justReleased = true;
                }
                mouse.right.released = true;
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
        mouse.left.justPressed = false;
        mouse.right.justPressed = false;
        mouse.left.justReleased = false;
        mouse.right.justReleased = false;
        mouse.wheel.justPressed = false;
        mouse.wheel.justReleased = false;
        prevMouse = clone(mouse);
    };
    var start = function () {
        // mouse events
        canvas.addEventListener('mousemove', move);
        canvas.addEventListener('mousedown', down);
        canvas.addEventListener('mouseup', up);
        canvas.addEventListener('wheel', wheel);
        // default mouse position, center of screen
        mouse.position.x = canvas.width / 2;
        mouse.position.y = canvas.height / 2;
    };
    return {
        getState: function () { return mouse; },
        start: start,
        update: update
    };
}
exports.default = { create: create };


/***/ }),

/***/ "./src/renderer.ts":
/*!*************************!*\
  !*** ./src/renderer.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var defaults_1 = __webpack_require__(/*! ./graphics/defaults */ "./src/graphics/defaults.ts");
var shapes_1 = __webpack_require__(/*! ./graphics/shapes */ "./src/graphics/shapes.ts");
var clear_1 = __webpack_require__(/*! ./graphics/clear */ "./src/graphics/clear.ts");
var effects_1 = __webpack_require__(/*! ./graphics/effects */ "./src/graphics/effects.ts");
var images_1 = __webpack_require__(/*! ./graphics/images */ "./src/graphics/images.ts");
var text_1 = __webpack_require__(/*! ./graphics/text */ "./src/graphics/text.ts");
var tiles_1 = __webpack_require__(/*! ./graphics/tiles */ "./src/graphics/tiles.ts");
var sprites_1 = __webpack_require__(/*! ./graphics/sprites */ "./src/graphics/sprites.ts");
var object_1 = __webpack_require__(/*! ./utils/object */ "./src/utils/object.ts");
function create(ctx) {
    var commands = [];
    var filterStack = [];
    var compositeStack = [];
    var transformStack = [];
    var alphaStack = [];
    function recomputeTransforms() {
        ctx.setTransform(1, 0, 0, 1, 0, 0); // reset
        for (var _i = 0, transformStack_1 = transformStack; _i < transformStack_1.length; _i++) {
            var t = transformStack_1[_i];
            var tr = t; // t itself is the transform object
            if ('scale' in tr) {
                var f = tr.scale;
                ctx.translate(tr.around.x, tr.around.y);
                if (typeof f === 'number')
                    ctx.scale(f, f);
                else
                    ctx.scale(f.x, f.y);
                ctx.translate(-tr.around.x, -tr.around.y);
            }
            if ('rotate' in tr) {
                ctx.translate(tr.around.x, tr.around.y);
                ctx.rotate((tr.rotate * Math.PI) / 180);
                ctx.translate(-tr.around.x, -tr.around.y);
            }
        }
    }
    function recomputeAlpha() {
        ctx.globalAlpha = alphaStack.reduce(function (acc, a) { return acc * a; }, 1);
    }
    function pushBlurFilter(px) {
        commands.push({ type: 'push', filter: "blur(".concat(px, "px)") });
    }
    function pushColourShiftFilter(options) {
        var hue = options.hue, saturate = options.saturate;
        commands.push({
            type: 'push',
            filter: "hue-rotate(".concat(hue, "deg) saturate(").concat(saturate, ")")
        });
    }
    function pushShadow(options) {
        commands.push({ type: 'pushShadow', shadow: options });
    }
    function popShadow() {
        commands.push({ type: 'popShadow' });
    }
    function popFilter() {
        commands.push({ type: 'pop' });
    }
    function blur(drawingOperations, radius) {
        if (radius === void 0) { radius = 4; }
        pushBlurFilter(radius);
        drawingOperations();
        popFilter();
    }
    function colourShift(drawingOperations, options) {
        if (options === void 0) { options = effects_1.defaultColourShift; }
        pushColourShiftFilter(options);
        drawingOperations();
        popFilter();
    }
    function pushComposite(op) {
        commands.push({ type: 'pushComposite', op: op });
    }
    function popComposite() {
        commands.push({ type: 'popComposite' });
    }
    function pushRotationTransform(rotation, around) {
        commands.push({
            type: 'pushTransform',
            transform: { rotate: rotation, around: around }
        });
    }
    function popTransform() {
        commands.push({ type: 'popTransform' });
    }
    function pushScale(factor, around) {
        if (around === void 0) { around = { x: 0, y: 0 }; }
        commands.push({
            type: 'pushTransform',
            transform: { scale: factor, around: around }
        });
    }
    function popScale() {
        commands.push({ type: 'popTransform' });
    }
    function pushStrokeGlow(options) {
        var _a, _b;
        if (options === void 0) { options = effects_1.defaultStrokeGlow; }
        commands.push({
            type: 'pushShadow',
            shadow: {
                shadowColour: (_a = options.color) !== null && _a !== void 0 ? _a : 'white',
                shadowBlur: (_b = options.blur) !== null && _b !== void 0 ? _b : 8,
                shadowOffsetX: 0,
                shadowOffsetY: 0
            }
        });
    }
    function strokeGlow(drawingOperations, options) {
        if (options === void 0) { options = effects_1.defaultStrokeGlow; }
        pushStrokeGlow(options);
        drawingOperations();
        popShadow();
    }
    function scale(drawingOperations, factor, around) {
        if (around === void 0) { around = { x: 0, y: 0 }; }
        pushScale(factor, around);
        drawingOperations();
        popScale();
    }
    function rotation(drawingOperations, rotateBy, around) {
        if (around === void 0) { around = { x: 0, y: 0 }; }
        pushRotationTransform(rotateBy, around);
        drawingOperations();
        popTransform();
    }
    function dodge(drawingOperations) {
        pushComposite('color-dodge');
        drawingOperations();
        popComposite();
    }
    function overlay(drawingOperations) {
        pushComposite('overlay');
        drawingOperations();
        popComposite();
    }
    function pushAlpha(alpha) {
        commands.push({ type: 'pushAlpha', alpha: alpha });
    }
    function popAlpha() {
        commands.push({ type: 'popAlpha' });
    }
    function transparency(drawingOperations, alpha) {
        if (alpha === void 0) { alpha = 0.25; }
        pushAlpha(alpha);
        drawingOperations();
        popAlpha();
    }
    function circle(position, radius, options) {
        if (options === void 0) { options = defaults_1.defaultCircle; }
        commands.push({
            type: 'draw',
            fn: function () { return (0, shapes_1.circle)(ctx, position, radius, options); }
        });
    }
    function clear(colour) {
        commands.push({
            type: 'draw',
            fn: function () { return (0, clear_1.clear)(ctx, colour); }
        });
    }
    function clearRect(rectangle, colour) {
        commands.push({
            type: 'draw',
            fn: function () { return (0, clear_1.clearRect)(ctx, rectangle, colour); }
        });
    }
    function curve(from, to, controlPoints, options) {
        if (options === void 0) { options = defaults_1.defaultLine; }
        commands.push({
            type: 'draw',
            fn: function () { return (0, shapes_1.curve)(ctx, from, to, controlPoints, options); }
        });
    }
    function image(image, position, size) {
        commands.push({
            type: 'draw',
            fn: function () { return (0, images_1.image)(ctx, image, position, size); }
        });
    }
    function subImage(image, position, size, subPosition, subSize) {
        commands.push({
            type: 'draw',
            fn: function () { return (0, images_1.subImage)(ctx, image, position, size, subPosition, subSize); }
        });
    }
    function line(from, to, options) {
        commands.push({
            type: 'draw',
            fn: function () { return (0, shapes_1.line)(ctx, from, to, options); }
        });
    }
    function rect(rectangle, options) {
        commands.push({
            type: 'draw',
            fn: function () { return (0, shapes_1.rect)(ctx, rectangle, options); }
        });
    }
    function shadow(drawingOperations, options) {
        if (options === void 0) { options = defaults_1.defaultDropShadow; }
        var merged = (0, object_1.merge)(defaults_1.defaultDropShadow, options);
        pushShadow(merged);
        drawingOperations();
        popShadow();
    }
    function sprite(spr) {
        commands.push({
            type: 'draw',
            fn: function () { return (0, sprites_1.sprite)(ctx, spr); }
        });
    }
    function square(position, size, options) {
        commands.push({
            type: 'draw',
            fn: function () { return (0, shapes_1.square)(ctx, position, size, options); }
        });
    }
    function txt(position, text, options) {
        if (text === void 0) { text = ''; }
        commands.push({
            type: 'draw',
            fn: function () { return (0, text_1.txt)(ctx, position, text, options); }
        });
    }
    function tiles(position, tileGrid, spriteSheets, scale) {
        commands.push({
            type: 'draw',
            fn: function () { return (0, tiles_1.tiles)(ctx, position, tileGrid, spriteSheets, scale); }
        });
    }
    function transform(drawingOperations, options) {
        if (options === void 0) { options = defaults_1.defaultTransform; }
        var merged = (0, object_1.merge)(defaults_1.defaultTransform, options);
        scale(function () {
            rotation(drawingOperations, merged.rotation, merged.around);
        }, merged.scale, merged.around);
    }
    function multiplyEffect(drawingOperations) {
        pushComposite('multiply');
        drawingOperations();
        popComposite();
    }
    function screen(drawingOperations) {
        pushComposite('screen');
        drawingOperations();
        popComposite();
    }
    function render() {
        for (var _i = 0, commands_1 = commands; _i < commands_1.length; _i++) {
            var cmd = commands_1[_i];
            switch (cmd.type) {
                case 'push': {
                    filterStack.push(cmd.filter);
                    ctx.filter = filterStack.join(' ');
                    break;
                }
                case 'pop': {
                    filterStack.pop();
                    ctx.filter = filterStack.join(' ');
                    break;
                }
                case 'pushAlpha':
                    alphaStack.push(cmd.alpha);
                    recomputeAlpha();
                    break;
                case 'popAlpha':
                    alphaStack.pop();
                    recomputeAlpha();
                    break;
                case 'pushComposite': {
                    compositeStack.push(cmd.op);
                    ctx.globalCompositeOperation =
                        compositeStack[compositeStack.length - 1];
                    break;
                }
                case 'popComposite': {
                    compositeStack.pop();
                    ctx.globalCompositeOperation =
                        compositeStack[compositeStack.length - 1] || 'source-over';
                    break;
                }
                case 'pushTransform':
                    transformStack.push(cmd.transform);
                    recomputeTransforms();
                    break;
                case 'popTransform':
                    transformStack.pop();
                    recomputeTransforms();
                    break;
                case 'draw': {
                    cmd.fn();
                    break;
                }
            }
        }
        commands = [];
        filterStack = [];
        compositeStack = [];
        transformStack = [];
        alphaStack = [];
    }
    return {
        circle: circle,
        clear: clear,
        clearRect: clearRect,
        curve: curve,
        dodge: dodge,
        image: image,
        line: line,
        overlay: overlay,
        rotation: rotation,
        rect: rect,
        shadow: shadow,
        sprite: sprite,
        scale: scale,
        square: square,
        subImage: subImage,
        text: txt,
        tiles: tiles,
        transparency: transparency,
        transform: transform,
        multiply: multiplyEffect,
        screen: screen,
        blur: blur,
        colourShift: colourShift,
        strokeGlow: strokeGlow,
        render: render
    };
}
exports.default = { create: create };


/***/ }),

/***/ "./src/sounds.ts":
/*!***********************!*\
  !*** ./src/sounds.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function create(ctx) {
    return {
        play: function (id) {
        },
        pause: function (id) {
        },
        mute: function (id) {
        },
        volume: function (id, level) {
        },
    };
}
exports.default = {
    create: create
};


/***/ }),

/***/ "./src/sprite.ts":
/*!***********************!*\
  !*** ./src/sprite.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function create(position, size, rotation, texture, colour) {
    if (rotation === void 0) { rotation = 0; }
    if (colour === void 0) { colour = '#ffffff'; }
    var frames = [];
    return {
        size: size,
        texture: texture,
        colour: colour,
        frame: 0,
        position: position,
        setFrames: function (newFrames) {
            frames = newFrames;
        },
        addFrame: function (frame) {
            frames.push(frame);
        },
        get frames() {
            return frames;
        },
        get rotation() {
            return rotation;
        },
        set rotation(degrees) {
            rotation = degrees >= 360 ? 360 - degrees : degrees;
        }
    };
}
exports.default = {
    create: create
};


/***/ }),

/***/ "./src/storage.ts":
/*!************************!*\
  !*** ./src/storage.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.clear = exports.remove = exports.load = exports.save = void 0;
function save(key, value) {
    localStorage.setItem(key, value);
}
exports.save = save;
function load(key) {
    return localStorage.getItem(key);
}
exports.load = load;
function remove(key) {
    localStorage.removeItem(key);
}
exports.remove = remove;
function clear() {
    localStorage.clear();
}
exports.clear = clear;


/***/ }),

/***/ "./src/types.ts":
/*!**********************!*\
  !*** ./src/types.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });


/***/ }),

/***/ "./src/utils/number.ts":
/*!*****************************!*\
  !*** ./src/utils/number.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.clamp = exports.toDegrees = exports.toRadians = void 0;
function toRadians(degrees) {
    return degrees * (Math.PI / 180);
}
exports.toRadians = toRadians;
function toDegrees(radians) {
    return radians * (180 / Math.PI);
}
exports.toDegrees = toDegrees;
function clamp(value, min, max) {
    if (min > max) {
        console.error("clamp: the minimum (".concat(min, ") and maximum (").concat(max, ") have been passed in the wrong order"));
        return value;
    }
    if (value < min) {
        return min;
    }
    if (value > max) {
        return max;
    }
    return value;
}
exports.clamp = clamp;
exports.default = {
    toRadians: toRadians,
    toDegrees: toDegrees
};


/***/ }),

/***/ "./src/utils/object.ts":
/*!*****************************!*\
  !*** ./src/utils/object.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
exports.merge = exports.clone = void 0;
// TODO: Handle Arrays
function deepClone(obj) {
    var result = {};
    Object.keys(obj).forEach(function (key) {
        switch (typeof obj[key]) {
            case 'object':
                result[key] = deepClone(obj[key]);
                break;
            default:
                result[key] = obj[key];
        }
    });
    return result;
}
function shallowClone(obj) {
    return __assign({}, obj);
}
function clone(obj, deep) {
    if (deep === void 0) { deep = true; }
    return deep === true ? deepClone(obj) : shallowClone(obj);
}
exports.clone = clone;
// TODO: Handle Arrays
function deepMerge(a, b) {
    var result = {};
    Object.keys(a).forEach(function (key) {
        if (typeof a[key] === 'object') {
            result[key] = b[key] === undefined ? a[key] : merge(a[key], b[key]);
        }
        else {
            result[key] = b[key] === undefined ? a[key] : b[key];
        }
    });
    // values that only exist on b need to be inserted afterwards
    Object.keys(b).forEach(function (key) {
        if (a[key] === undefined) {
            result[key] = b[key];
        }
    });
    return result;
}
function shallowMerge(a, b) {
    return __assign(__assign({}, a), b);
}
function merge(a, b, deep) {
    if (deep === void 0) { deep = true; }
    return deep === true ? deepMerge(a, b) : shallowMerge(a, b);
}
exports.merge = merge;
exports.default = {
    merge: merge,
    clone: clone
};


/***/ }),

/***/ "./src/vec2.ts":
/*!*********************!*\
  !*** ./src/vec2.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
    var getOpposite = function () {
        return create(-x, -y);
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


/***/ })

/******/ });
});
//# sourceMappingURL=bramble.js.map