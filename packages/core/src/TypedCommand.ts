import type { Color3 } from './Color3'
import { Command } from './Command'
import type { Easing } from './Easing'
import type { Timestamp } from './Timestamp'
import type { Vector2 } from './Vector2'

/** Tells the object to do something. */
export class TypedCommand<
  T = string | number | Vector2 | Color3,
> extends Command {
  readonly startTime: Timestamp
  readonly endTime?: Timestamp
  readonly startValue: T
  readonly endValue?: T
  readonly easing?: Easing

  constructor({
    event,
    startTime,
    endTime,
    startValue,
    endValue,
    easing,
  }: {
    event: string
    startTime: Timestamp
    endTime?: Timestamp
    startValue: T
    endValue?: T
    easing?: Easing
  }) {
    super({
      event,
    })
    this.startTime = startTime
    this.endTime = endTime
    this.startValue = startValue
    this.endValue = endValue
    this.easing = easing
  }
}
