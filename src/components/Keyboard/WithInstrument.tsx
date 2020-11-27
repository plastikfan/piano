
import React, { Component, ComponentType, FunctionComponent, useEffect } from "react"
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

// pg255: Higher Order Components
//
import { InstrumentName, Player } from "soundfont-player"
import { MidiValue } from "../../domain/note"
import { DEFAULT_INSTRUMENT, AudioNodesRegistry } from "../../domain/sound"
import { Optional } from "../../domain/types"

import Soundfont from "soundfont-player"

// pg255: Higher Order Components
//
interface InjectedProps {
  loading: boolean
  play(note: MidiValue): Promise<void>
  stop(note: MidiValue): Promise<void>
}
interface ProviderProps {
  AudioContext: AudioContextType
  instrument: InstrumentName
}
interface ProviderState {
  loading: boolean
  current: Optional<InstrumentName>
}

// pg256
//
export function withInstrument<TProps extends InjectedProps = InjectedProps>(
  WrappedComponent: ComponentType<TProps>) {

  const displayName = WrappedComponent.displayName || WrappedComponent.name || "Component"

  // this class is equivalent to SoundfontProviderClass (the render props class)
  // This version is the same as SoundfontProviderClass, except the render method
  //
  return class WithInstrument extends Component<ProviderProps, ProviderState> {
    public static displayName = `withInstrument(${displayName})`

    public static defaultProps = {
      instrument: DEFAULT_INSTRUMENT
    }

    constructor(props: ProviderProps) {
      super(props)

      const { AudioContext } = this.props
      this.audio = new AudioContext()
    }


    private audio: AudioContext
    private player: Optional<Player> = null
    private activeNodes: AudioNodesRegistry = {}

    public state: ProviderState = {
      loading: false,
      current: null
    }

    private resume = async () => {
      return this.audio.state === "suspended"
        ? await this.audio.resume()
        : Promise.resolve()
    }

    private load = async (instrument: InstrumentName) => {
      this.setState({ loading: true })
      this.player = await Soundfont.instrument(this.audio, instrument)

      this.setState({ loading: false, current: instrument })
    }

    public componentDidMount() {
      const { instrument } = this.props
      this.load(instrument)
    }

    public shouldComponentUpdate({ instrument }: ProviderProps) {
      return this.state.current !== instrument
    }

    public componentDidUpdate({
      instrument: prevInstrument
    }: ProviderProps) {
      const { instrument } = this.props
      if (instrument && instrument !== prevInstrument)
        this.load(instrument)
    }

    public play = async (note: MidiValue) => {
      await this.resume()
      if (!this.player) return

      const node = this.player.play(note.toString())
      this.activeNodes = { ...this.activeNodes, [note]: node }
    }

    public stop = async (note: MidiValue) => {
      await this.resume()
      if (!this.activeNodes[note]) return

      this.activeNodes[note]!.stop()
      this.activeNodes = { ...this.activeNodes, [note]: null }
    }

    // loading, play and stop are items that are relevent to Keyboard and hence
    // these need to be injected the wrapped component via its props
    //
    public render() {
      const injected = {
        loading: this.state.loading,
        play: this.play,
        stop: this.stop
      } as InjectedProps
      return (
        <WrappedComponent {...this.props} {...(injected as TProps)} />
      )
    }
  }
}

//pg258
// WrappedKeyboard is a variable that contains JSX
//
const WrappedKeyboard = withInstrument(Keyboard)


// pg243
//
export const KeyboardWithInstrument: FunctionComponent = () => {
  const AudioContext = useAudioContext()!
  const { instrument } = useInstrument()

  return (
    // pg258: HOC VERSION using WrappedKeyboard function
    //
    <WrappedKeyboard
      AudioContext={AudioContext}
      instrument={instrument}
    />

    // RENDER PROPS VERSION:
    //
    // <SoundfontProvider
    //   AudioContext={AudioContext}
    //   instrument={instrument}
    //   render={(props) => <Keyboard {...props} />}
    // />
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
