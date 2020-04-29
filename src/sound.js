const ctx = new AudioContext()
const oscillator = ctx.createOscillator()
const gain = ctx.createGain()

function decode(arrayBuffer) {
  return new Promise((resolve, reject) => {
    ctx
      .decodeAudioData(arrayBuffer)
      .then(audioBuffer => resolve(audioBuffer))
      .catch(err => reject(err))
  })
}

function play(audioBuffer) {
  const source = ctx.createBufferSource()

  source.buffer = audioBuffer
  source.connect(ctx.destination)
  source.start()
}

export default {
  decode,
  play
}
