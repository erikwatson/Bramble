"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadAllTerrain = exports.loadTerrain = exports.loadAllMusic = exports.loadMusic = exports.loadAllSounds = exports.loadSound = exports.loadAllImages = exports.loadImage = exports.loadAllText = exports.loadString = void 0;
var terrain_1 = require("./terrain");
var sound_1 = require("./sound");
function loadString(path) {
    return new Promise(function (resolve, reject) {
        var request = new XMLHttpRequest();
        request.addEventListener('load', function (event) {
            resolve(request.responseText);
        });
        request.addEventListener('error', function (event) {
            reject(event);
        });
        request.open('GET', path);
        request.send();
    });
}
exports.loadString = loadString;
function loadAllText(paths) {
    if (paths === void 0) { paths = []; }
    return Promise.all(paths.map(function (x) { return loadString(x); }));
}
exports.loadAllText = loadAllText;
function loadImage(path) {
    return new Promise(function (resolve, reject) {
        var img = new Image();
        img.addEventListener('load', function (e) {
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
function loadSound(path) {
    return new Promise(function (resolve, reject) {
        window
            .fetch(path)
            .then(function (response) { return response.arrayBuffer(); })
            .then(function (arrayBuffer) { return sound_1.default.decode(arrayBuffer); })
            .then(function (decoded) { return resolve(decoded); })
            .catch(function (err) { return reject(err); });
    });
}
exports.loadSound = loadSound;
function loadAllSounds(paths) {
    if (paths === void 0) { paths = []; }
    return Promise.all(paths.map(function (x) { return loadSound(x); }));
}
exports.loadAllSounds = loadAllSounds;
// TODO: I am not sure yet if/how these are meaningfully different to loadSound
function loadMusic(path) {
    return new Promise(function (resolve, reject) { });
}
exports.loadMusic = loadMusic;
function loadAllMusic(paths) {
    if (paths === void 0) { paths = []; }
    return Promise.all(paths.map(function (x) { return loadMusic(x); }));
}
exports.loadAllMusic = loadAllMusic;
// Downloads a Terrain file,
// reads it,
// downloads the related image file,
// returns a new Terrain object
function loadTerrain(path) {
    var description;
    return loadString(path)
        .then(function (json) {
        description = JSON.parse(json);
        return loadImage(description.path);
    })
        .then(function (image) {
        return terrain_1.default.create(description.name, description.type, image, description.tiles);
    });
}
exports.loadTerrain = loadTerrain;
function loadAllTerrain(paths) {
    if (paths === void 0) { paths = []; }
    return Promise.all(paths.map(function (x) { return loadTerrain(x); }));
}
exports.loadAllTerrain = loadAllTerrain;
exports.default = {
    loadImage: loadImage,
    loadString: loadString,
    loadAllText: loadAllText,
    loadAllImages: loadAllImages,
    loadSound: loadSound,
    loadAllSounds: loadAllSounds,
    loadTerrain: loadTerrain,
    loadAllTerrain: loadAllTerrain
};
