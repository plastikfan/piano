import { FunctionComponent, ReactElement, useCallback, useEffect, useRef, useState } from "react";
import Soundfont, { InstrumentName, Player } from "soundfont-player";
import { MidiValue } from "../../domain/note";
import { AudioNodesRegistry, DEFAULT_INSTRUMENT } from "../../domain/sound";
import { Optional } from "../../domain/types";

interface ProviderProps {
  instrument?: InstrumentName
  AudioContext: AudioContextType
  render(props: ProvidedProps): ReactElement
}

interface ProvidedProps {
  loading: boolean
  play(note: MidiValue): Promise<void>
  stop(note: MidiValue): Promise<void>
}

export const SoundfontProvider: FunctionComponent<ProviderProps> = ({
  AudioContext,
  instrument,
  render
}) => {
  let activeNodes: AudioNodesRegistry = {}

  const [current, setCurrent] = useState<Optional<InstrumentName>>(
    null
  )
  const [loading, setLoading] = useState<boolean>(false)
  const [player, setPlayer] = useState<Optional<Player>>(null)
  const audio = useRef(new AudioContext())

  const loadInstrument = useCallback(() => load(instrument), [
    instrument
  ])

  // This is new as described on pg242
  //
  useEffect(() => {
    if (!loading && instrument !== current) loadInstrument()
  }, [loadInstrument, loading, instrument, current])

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

  // return statement as described on pg243
  //
  return render({
    loading,
    play,
    stop
  })
}
