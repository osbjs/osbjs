import { Timestamp } from '../types/Timestamp'
import { Vector2 } from '../types/Vector2'
import { HitObject } from './HitObject'
import type { HitSample } from './HitSample'

export class Hold extends HitObject {
  endTime: Timestamp

  constructor({
    time,
    endTime,
    type,
    hitSound,
    hitSample,
  }: {
    time: Timestamp
    endTime: Timestamp
    type: number
    hitSound: number
    hitSample?: HitSample
  }) {
    super({ position: new Vector2(256, 192), time, type, hitSound, hitSample })
    this.endTime = endTime
  }

  override toString(): string {
    let result = `${this.position.x},${this.position.y},${this.time},${this.type},${this.hitSound},${this.endTime}`
    if (this.hitSample) result += `:${this.hitSample}`

    return result
  }
}
