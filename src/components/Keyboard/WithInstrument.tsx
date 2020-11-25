
import React, { FunctionComponent, useEffect } from "react"
import { useAudioContext } from "../AudioContextProvider/useAudioContext"
import { useSoundfont } from "../../adapters/Soundfont/useSoundfont"
import { useMount } from "../../utils/useMount"
import { Keyboard } from "../Keyboard/Keyboard"

import "./style.css"

// pg239: useInstrument
//
import { useInstrument } from "../../state/Instrument/Context"

// This file new with pg229 (step-4)
//
export const KeyboardWithInstrument: FunctionComponent = () => {
  const AudioContext = useAudioContext()!

  // pg239: useInstrument
  //
  const { instrument } = useInstrument()
  const { loading, current, play, stop, load } = useSoundfont({ AudioContext })

  // we replace "useMount(load)" with useEffect as below pg239:
  // "Notice that we replace useMount() hook with useEffect() hook. We have to do that
  // since we want to dynamically change our instruments sounds set, instead of loading
  // it once when mounted"
  //
  useEffect(() => {
    if (!loading && instrument !== current) load(instrument)
  }, [load, loading, current, instrument])

  return <Keyboard loading={loading} play={play} stop={stop} />
}
