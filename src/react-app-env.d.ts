/// <reference types="react-scripts" />

// NB AudioContext is defined in lib.dom.d.ts

type AudioContextType = typeof AudioContext

interface Window extends Window {
  webkitAudioContext: AudioContextType
}
