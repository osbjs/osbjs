import { Timestamp } from '../types/Timestamp'
import { Vector2 } from '../types/Vector2'
import type { HitSample } from './HitSample'

export abstract class HitObject {
  position: Vector2
  time: Timestamp
  type: number
  hitSound: number
  hitSample?: HitSample

  constructor({
    position,
    time,
    type,
    hitSound,
    hitSample,
  }: {
    position: Vector2
    time: Timestamp
    type: number
    hitSound: number
    hitSample?: HitSample
  }) {
    this.position = position
    this.time = time
    this.type = type
    this.hitSound = hitSound
    this.hitSample = hitSample
  }

  abstract toString(): string

  static PlayfieldSize = new Vector2(512, 384)
  static StoryboardSize = new Vector2(640, 480)
  static PlayfieldToStoryboardOffset = new Vector2(
    (HitObject.StoryboardSize.x - HitObject.PlayfieldSize.x) * 0.5,
    (HitObject.StoryboardSize.y - HitObject.PlayfieldSize.y) * 0.75 - 16,
  )
}
