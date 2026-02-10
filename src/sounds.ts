import { Sound } from "./types"

function create(ctx: AudioContext): Sound {
  return {
    play(id: string) {

    },

    pause(id: string) {

    },

    mute(id: string) {

    },

    volume(id: string, level: number) {

    },
  }
}

export default {
  create
}
