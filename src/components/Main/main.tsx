import React, { FunctionComponent } from "react"
// import { KeyboardWithInstrument } from "../Keyboard/WithInstrument"
import { NoAudioMessage } from "../NoAudioMessage"
import { useAudioContext } from "../AudioContextProvider"
import { Playground } from "../Playground"

export const Main: FunctionComponent = () => {
  const AudioContext = useAudioContext()
  // The double bang op ensures the value it applies to is a boolean
  //
  // pg238: replace KeyboardWithInstrument with Playground
  //
  return !!AudioContext ? <Playground /> : <NoAudioMessage />
}
