import { InstrumentName, Player } from "soundfont-player"

// pg225
//
import { MidiValue } from "./note"
import { Optional } from "./types"
export type AudioNodesRegistry = Record<MidiValue, Optional<Player>>

export const DEFAULT_INSTRUMENT: InstrumentName =
  "acoustic_grand_piano"
