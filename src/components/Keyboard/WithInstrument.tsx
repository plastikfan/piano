
import React, { FunctionComponent, useEffect } from "react"
import { useAudioContext } from "../AudioContextProvider/useAudioContext"

//pg243
//
import { SoundfontProvider } from "../../adapters/Soundfont"

// pg243, no longer require these imports
//
// import { useSoundfont } from "../../adapters/Soundfont/useSoundfont"
// import { useMount } from "../../utils/useMount"
import { Keyboard } from "../Keyboard/Keyboard"

import "./style.css"

// pg239: useInstrument
//
import { useInstrument } from "../../state/Instrument"


// pg243
//
export const KeyboardWithInstrument: FunctionComponent = () => {
  const AudioContext = useAudioContext()!
  const { instrument } = useInstrument()

  return (
    <SoundfontProvider
      AudioContext={AudioContext}
      instrument={instrument}
      render={(props) => <Keyboard {...props} />}
    />
  )
}

// pg243, use SoundfontProvider, so this version of KeyboardWithInstrument
// is redundant
//
// This file new with pg229 (step-4)
//
// export const KeyboardWithInstrument: FunctionComponent = () => {
//   const AudioContext = useAudioContext()!

//   // pg239: useInstrument
//   //
//   const { instrument } = useInstrument()
//   const { loading, current, play, stop, load } = useSoundfont({ AudioContext })

//   // we replace "useMount(load)" with useEffect as below pg239:
//   // "Notice that we replace useMount() hook with useEffect() hook. We have to do that
//   // since we want to dynamically change our instruments sounds set, instead of loading
//   // it once when mounted"
//   //
//   useEffect(() => {
//     if (!loading && instrument !== current) load(instrument)
//   }, [load, loading, current, instrument])

//   return <Keyboard loading={loading} play={play} stop={stop} />
// }
