
import React, { FunctionComponent } from "react"
import { useAudioContext } from "../AudioContextProvider"
import { useSoundfont } from "../../adapters/Soundfont"
import { useMount } from "../../utils/useMount"
import { Keyboard } from "../Keyboard"
import "./style.css"

// This file new with pg229 (step-4)
//
export const KeyboardWithInstrument: FunctionComponent = () => {
  const AudioContext = useAudioContext()!
  const { loading, play, stop, load } = useSoundfont({ AudioContext })

  useMount(load)

  return <Keyboard loading={loading} play={play} stop={stop} />
}
