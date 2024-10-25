import { Color3, type Color3Tuple, type IColor3 } from '../types/Color3'
import { Timestamp } from '../types/Timestamp'
import { Vector2, type IVector2, type Vector2Tuple } from '../types/Vector2'
import { Command } from './Command'
import type { Easing } from './Easing'

export class TypedCommand<
  T = string | number | Vector2 | Color3,
> extends Command {
  readonly endTime?: Timestamp
  readonly startValue: T
  readonly endValue?: T
  readonly easing: Easing

  constructor({
    event,
    startTime,
    endTime,
    startValue,
    endValue,
    easing,
  }: {
    event: string
    startTime: string | number | Timestamp
    endTime?: string | number | Timestamp
    startValue: T
    endValue?: T
    easing?: Easing
  }) {
    super({
      event,
      startTime,
    })
    this.endTime = endTime
      ? endTime instanceof Timestamp
        ? endTime
        : new Timestamp(endTime)
      : undefined
    this.startValue = startValue
    this.endValue = endValue
    this.easing = easing || 0
  }
}

export class Rotate extends TypedCommand<number> {
  constructor({
    startTime,
    endTime,
    startValue,
    endValue,
    easing,
  }: {
    startTime: string | number | Timestamp
    endTime?: string | number | Timestamp
    startValue: number
    endValue?: number
    easing?: Easing
  }) {
    super({ event: 'R', startTime, endTime, startValue, endValue, easing })
  }
}

export class Scale extends TypedCommand<number> {
  constructor({
    startTime,
    endTime,
    startValue,
    endValue,
    easing,
  }: {
    startTime: string | number | Timestamp
    endTime?: string | number | Timestamp
    startValue: number
    endValue?: number
    easing?: Easing
  }) {
    super({ event: 'S', startTime, endTime, startValue, endValue, easing })
  }
}

export class MoveX extends TypedCommand<number> {
  constructor({
    startTime,
    endTime,
    startValue,
    endValue,
    easing,
  }: {
    startTime: string | number | Timestamp
    endTime?: string | number | Timestamp
    startValue: number
    endValue?: number
    easing?: Easing
  }) {
    super({ event: 'MX', startTime, endTime, startValue, endValue, easing })
  }
}

export class MoveY extends TypedCommand<number> {
  constructor({
    startTime,
    endTime,
    startValue,
    endValue,
    easing,
  }: {
    startTime: string | number | Timestamp
    endTime?: string | number | Timestamp
    startValue: number
    endValue?: number
    easing?: Easing
  }) {
    super({ event: 'MY', startTime, endTime, startValue, endValue, easing })
  }
}

export class Fade extends TypedCommand<number> {
  constructor({
    startTime,
    endTime,
    startValue,
    endValue,
    easing,
  }: {
    startTime: string | number | Timestamp
    endTime?: string | number | Timestamp
    startValue: number
    endValue?: number
    easing?: Easing
  }) {
    super({ event: 'F', startTime, endTime, startValue, endValue, easing })
  }
}

export class Move extends TypedCommand<Vector2> {
  constructor({
    startTime,
    endTime,
    startValue,
    endValue,
    easing,
  }: {
    startTime: string | number | Timestamp
    endTime?: string | number | Timestamp
    startValue: IVector2 | Vector2Tuple
    endValue?: IVector2 | Vector2Tuple
    easing?: Easing
  }) {
    super({
      event: 'M',
      startTime,
      endTime,
      startValue: new Vector2(startValue),
      endValue: endValue ? new Vector2(endValue) : undefined,
      easing,
    })
  }
}

export class ScaleVec extends TypedCommand<Vector2> {
  constructor({
    startTime,
    endTime,
    startValue,
    endValue,
    easing,
  }: {
    startTime: string | number | Timestamp
    endTime?: string | number | Timestamp
    startValue: IVector2 | Vector2Tuple
    endValue?: IVector2 | Vector2Tuple
    easing?: Easing
  }) {
    super({
      event: 'V',
      startTime,
      endTime,
      startValue: new Vector2(startValue),
      endValue: endValue ? new Vector2(endValue) : undefined,
      easing,
    })
  }
}

export class Color extends TypedCommand<Color3> {
  constructor({
    startTime,
    endTime,
    startValue,
    endValue,
    easing,
  }: {
    startTime: string | number | Timestamp
    endTime?: string | number | Timestamp
    startValue: IColor3 | Color3Tuple
    endValue?: IColor3 | Color3Tuple
    easing?: Easing
  }) {
    super({
      event: 'C',
      startTime,
      endTime,
      startValue: new Color3(startValue),
      endValue: endValue ? new Color3(endValue) : undefined,
      easing,
    })
  }
}

export class FlipH extends TypedCommand<string> {
  constructor({
    startTime,
    endTime,
  }: {
    startTime: string | number | Timestamp
    endTime?: string | number | Timestamp
  }) {
    super({ event: 'P', startTime, endTime, startValue: 'H' })
  }
}

export class FlipV extends TypedCommand<string> {
  constructor({
    startTime,
    endTime,
  }: {
    startTime: string | number | Timestamp
    endTime?: string | number | Timestamp
  }) {
    super({ event: 'P', startTime, endTime, startValue: 'V' })
  }
}

export class Additive extends TypedCommand<string> {
  constructor({
    startTime,
    endTime,
  }: {
    startTime: string | number | Timestamp
    endTime?: string | number | Timestamp
  }) {
    super({ event: 'P', startTime, endTime, startValue: 'A' })
  }
}
