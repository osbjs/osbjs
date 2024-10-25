import { clamp } from '../maths'
import { Timestamp } from '../types/Timestamp'
import type { SampleLayer } from './SampleLayer'

/**
 * Represents an audio sample in the storyboard.
 */
export class Sample {
  /** The time at which the sample is played. */
  readonly time: Timestamp
  /** The layer on which the sample is played. */
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
    time: number | string | Timestamp

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
    this.time = time instanceof Timestamp ? time : new Timestamp(time)
    this.layer = layer
    this.path = path
    this.volume = clamp(volume, 0, 100)
  }

  toString() {
    return `Sample,${this.time},${this.layer},"${this.path}",${this.volume}`
  }
}
