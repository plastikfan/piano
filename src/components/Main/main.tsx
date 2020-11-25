import React, { FunctionComponent } from "react"
import { Keyboard } from "../Keyboard"
import { NoAudioMessage } from "../NoAudioMessage"
import { useAudioContext } from "../AudioContextProvider"

export const Main: FunctionComponent = () => {
  const AudioContext = useAudioContext()
  // The double bang op ensures the value it applies to is a boolean
  //
  return !!AudioContext ? <Keyboard /> : <NoAudioMessage />
}
