"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ctx = new AudioContext();
var oscillator = ctx.createOscillator();
var gain = ctx.createGain();
function decode(arrayBuffer) {
    return new Promise(function (resolve, reject) {
        ctx
            .decodeAudioData(arrayBuffer)
            .then(function (audioBuffer) { return resolve(audioBuffer); })
            .catch(function (err) { return reject(err); });
    });
}
function play(audioBuffer) {
    var source = ctx.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(ctx.destination);
    source.start();
}
exports.default = {
    decode: decode,
    play: play
};
