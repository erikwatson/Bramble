const ctx = new AudioContext()
const oscillator = ctx.createOscillator()
const gain = ctx.createGain()

function decode(arrayBuffer: ArrayBuffer) {
  return new Promise((resolve, reject) => {
    ctx
      .decodeAudioData(arrayBuffer)
      .then(audioBuffer => resolve(audioBuffer))
      .catch((err: ErrorEvent) => reject(err))
  })
}

function play(audioBuffer: AudioBuffer) {
  const source = ctx.createBufferSource()

  source.buffer = audioBuffer
  source.connect(ctx.destination)
  source.start()
}

export default {
  decode,
  play
}
