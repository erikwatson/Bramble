declare function decode(arrayBuffer: ArrayBuffer): Promise<unknown>;
declare function play(audioBuffer: AudioBuffer): void;
declare const _default: {
    decode: typeof decode;
    play: typeof play;
};
export default _default;
