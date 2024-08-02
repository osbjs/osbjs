import { clamp } from './maths'
import { Timestamp } from './Timestamp'

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

  /**
   * @param time - The time at which the sample is played.
   * @param layer - The layer on which the sample is placed.
   * @param path - The file path of the sample.
   * @param volume - The volume of the sample, clamped between 0 and 100.
   */
  constructor({
    time,
    layer,
    path,
    volume = 100,
  }: {
    time: number | string
    layer: SampleLayer
    path: string
    volume?: number
  }) {
    this.time = new Timestamp(time)
    this.layer = layer
    this.path = path
    this.volume = clamp(volume, 0, 100)
  }

  toOsbString() {
    return `Sample,${this.time},${this.layer},"${this.path}",${this.volume}\n`
  }
}
