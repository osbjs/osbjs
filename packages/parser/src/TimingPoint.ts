export const SampleSet = {
  Default: 0,
  Normal: 1,
  Soft: 2,
  Drum: 3,
} as const

export type SampleSet = (typeof SampleSet)[keyof typeof SampleSet]

export class TimingPoint {
  time: number
  sampleSet: SampleSet
  sampleIndex: number
  volume: number
  effects: number
  uninherited: boolean
  beatLength: number
  meter?: number

  constructor({
    time,
    sampleIndex,
    sampleSet,
    volume,
    effects,
    uninherited,
    beatLength,
    meter,
  }: {
    time: number
    sampleSet: SampleSet
    sampleIndex: number
    volume: number
    effects: number
    uninherited: boolean
    beatLength: number
    meter?: number
  }) {
    this.time = time
    this.sampleIndex = sampleIndex
    this.sampleSet = sampleSet
    this.volume = volume
    this.effects = effects
    this.beatLength = beatLength
    this.uninherited = uninherited
    this.meter = meter
  }

  get kiaiEnabled() {
    return (this.effects & 1) === 1
  }

  get firstBarOmitted() {
    return (this.effects & 8) === 1
  }

  set kiaiEnabled(b: boolean) {
    if (b) {
      this.effects | (1 << 0)
    } else {
      this.effects & ~(1 << 0)
    }
  }

  set firstBarOmitted(b: boolean) {
    if (b) {
      this.effects | (1 << 3)
    } else {
      this.effects & ~(1 << 3)
    }
  }

  toString() {
    return `${this.time},${this.beatLength},${this.meter},${this.sampleSet},${this.sampleIndex},${this.volume},${this.uninherited},${this.effects}`
  }
}
