import { Timestamp } from '../types/Timestamp'
import { Vector2 } from '../types/Vector2'
import { HitObject } from './HitObject'
import type { HitSample } from './HitSample'

export class Spinner extends HitObject {
  endTime: Timestamp

  constructor({
    startTime,
    endTime,
    type,
    hitSound,
    hitSample,
  }: {
    startTime: Timestamp
    endTime: Timestamp
    type: number
    hitSound: number
    hitSample?: HitSample
  }) {
    super({ position: new Vector2(256, 192), time: startTime, type, hitSound, hitSample })
    this.endTime = endTime
  }

  override toString(): string {
    let result = `${this.position.x},${this.position.y},${this.time},${this.type},${this.hitSound},${this.endTime}`
    if (this.hitSample) result += `,${this.hitSample}`

    return result
  }
}
