import { StoryboardObject } from './StoryboardObject'
import { clamp } from './mathUtils'

export const SampleLayer = {
  Background: 0,
  Fail: 1,
  Pass: 2,
  Foreground: 3,
} as const

export class Sample extends StoryboardObject {
  time: number
  layer: number
  path: string
  volume: number

  constructor({
    time,
    layer,
    path,
    volume,
  }: {
    time: number
    layer: number
    path: string
    volume: number
  }) {
    super()
    this.time = time
    this.layer = layer
    this.path = path
    this.volume = clamp(volume, 0, 100)
  }

  toString(): string {
    return `Sample,${this.time},${this.layer},"${this.path}",${this.volume}`
  }
}
