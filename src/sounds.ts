import { Sound, AssetStore } from "./types"

function create(ctx: AudioContext, assets: AssetStore): Sound {
  const nodes = new Map<string, { source: AudioBufferSourceNode, gain: GainNode }>()

  return {
    play(id: string) {
      const buffer = assets.sounds.get(id)
      if (buffer === undefined) {
        return
      }

      const gain = ctx.createGain()
      const source = ctx.createBufferSource()
      source.buffer = buffer
      source.connect(gain).connect(ctx.destination)
      source.start()
      nodes.set(id, { source, gain })
    },

    stop(id: string) {
      const node = nodes.get(id)
      if (node === undefined) {
        return
      }

      node.source.stop()
      nodes.delete(id)
    },

    mute(id: string) {
      const node = nodes.get(id)
      if (node === undefined) {
        return
      }

      node.gain.gain.value = 0
    },

    volume(id: string, level: number) {
      const node = nodes.get(id)
      if (node === undefined) {
        return
      }

      node.gain.gain.value = level
    }
  }
}

export default { create }
