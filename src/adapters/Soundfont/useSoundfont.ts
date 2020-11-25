
import { useState, useRef } from "react"
import Soundfont, { InstrumentName, Player } from "soundfont-player"
import { MidiValue } from "../../domain/note"
import { Optional } from "../../domain/types"
import {
  AudioNodesRegistry,
  DEFAULT_INSTRUMENT
} from "../../domain/sound"

// (pg223) This whole file is new for step-4
//
interface Settings {
  AudioContext: AudioContextType
}

interface Adapted {
  // loading: new instrument is being loaded when true; used to disable the
  // keyboard while loading
  //
  loading: boolean
  current: Optional<InstrumentName> // current instrument

  // interaction functions. All return promises because they are async functions
  // and the Audio API is async
  //
  load(instrument?: InstrumentName): Promise<void>
  play(note: MidiValue): Promise<void>
  stop(note: MidiValue): Promise<void>
}

export function useSoundfont({ AudioContext }: Settings): Adapted {
  let activeNodes: AudioNodesRegistry = {}
  const [current, setCurrent] = useState<Optional<InstrumentName>>(
    null
  )
  const [loading, setLoading] = useState<boolean>(false)
  const [player, setPlayer] = useState<Optional<Player>>(null)
  // 'new AudioContext' -> control freak; shouldn't we just declare our
  // dependnecies and have this injected? Otherwise how do we write isolated
  // unit test case?
  //
  const audio = useRef(new AudioContext())

  async function resume() {
    return audio.current.state === "suspended"
      ? await audio.current.resume()
      : Promise.resolve()
  }

  async function load(
    instrument: InstrumentName = DEFAULT_INSTRUMENT
  ) {
    setLoading(true)
    const player = await Soundfont.instrument(
      audio.current,
      instrument
    )

    setLoading(false)
    setCurrent(instrument)
    setPlayer(player)
  }

  async function play(note: MidiValue) {
    await resume()
    if (!player) return

    const node = player.play(note.toString())
    activeNodes = { ...activeNodes, [note]: node }
  }

  async function stop(note: MidiValue) {
    await resume()
    if (!activeNodes[note]) return

    activeNodes[note]!.stop()
    activeNodes = { ...activeNodes, [note]: null }
  }

  return {
    loading,
    current,

    load,
    play,
    stop
  }
}
