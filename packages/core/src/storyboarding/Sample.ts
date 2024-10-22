import { clamp } from '../maths'
import { Timestamp } from '../types/Timestamp'

/**
 * Possible layers for a sample.
 */
export const SampleLayer = {
  Background: 0,
  Fail: 1,
  Pass: 2,
  Foreground: 3,
} as const

/**
 * Possible layers for a sample.
 */
export type SampleLayer = (typeof SampleLayer)[keyof typeof SampleLayer]

export function isSampleLayer(layer: unknown): layer is SampleLayer {
  return layer === 0 || layer === 1 || layer === 2 || layer === 3
}

/**
 * Represents an audio sample in the storyboard.
 */
export class Sample {
  /** The time at which the sample is played. */
  readonly time: Timestamp
  /** The layer on which the sample is placed. */
  readonly layer: SampleLayer
  /** The file path of the sample. */
  readonly path: string
  /** The volume of the sample. */
  readonly volume: number

  constructor({
    time,
    layer,
    path,
    volume = 100,
  }: {
    /**
     * The time at which the sample is played.
     */
    time: number | string

    /**
     * The layer on which the sample is placed.
     */
    layer: SampleLayer

    /**
     * The file path of the sample.
     */
    path: string

    /**
     * The volume of the sample, clamped between 0 and 100.
     */
    volume?: number
  }) {
    this.time = new Timestamp(time)
    this.layer = layer
    this.path = path
    this.volume = clamp(volume, 0, 100)
  }

  toString() {
    return `Sample,${this.time},${this.layer},"${this.path}",${this.volume}`
  }
}
