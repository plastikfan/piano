import React, { FunctionComponent } from "react"
import { KeyboardWithInstrument } from "../Keyboard/WithInstrument"
import { NoAudioMessage } from "../NoAudioMessage/NoAudioMessage"
import { useAudioContext } from "../AudioContextProvider/useAudioContext"

export const Main: FunctionComponent = () => {
  const AudioContext = useAudioContext()
  // The double bang op ensures the value it applies to is a boolean
  //
  return !!AudioContext ? <KeyboardWithInstrument /> : <NoAudioMessage />
}
