import type { Vector2 } from '../types/Vector2'
import type { HitSample } from './HitSample'

export abstract class HitObject {
  position: Vector2
  time: number
  type: number
  hitSound: number
  hitSample: HitSample

  constructor({
    position,
    time,
    type,
    hitSample,
    hitSound,
  }: {
    position: Vector2
    time: number
    type: number
    hitSound: number
    hitSample: HitSample
  }) {
    this.position = position
    this.time = time
    this.type = type
    this.hitSound = hitSound
    this.hitSample = hitSample
  }

  abstract toString(): string
}
