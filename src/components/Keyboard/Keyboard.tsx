import React, { FunctionComponent } from "react"
import { selectKey } from "../../domain/keyboard"

// pg228 (step-4): MidiValue
//
import { notes, MidiValue } from "../../domain/note"
import { Key } from "../Key/Key"
import "./style.css"

// pg228 (step-4)
//

export interface KeyboardProps {
  loading: boolean
  play: (note: MidiValue) => Promise<void>
  stop: (note: MidiValue) => Promise<void>
}

// pg228
// onDown is not defined; thats because it needs to go in Key ... (page 229)
//
export const Keyboard: FunctionComponent<KeyboardProps> = ({
  loading,
  stop,
  play
}) => (<div className="keyboard">
    {
      notes.map(({ midi, type, index, octave }) => {
        const label = selectKey(octave, index)
        return <Key
          key={midi}
          type={type}
          label={label}
          disabled={loading}
          onDown={() => play(midi)}
          onUp={() => stop(midi)}
        />
      })
    }
  </div>)

