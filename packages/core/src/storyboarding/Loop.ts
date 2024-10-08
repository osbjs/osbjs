import { Timestamp } from '../types/Timestamp'
import { CompoundCommand } from './CompoundCommand'
import type { TypedCommand } from './TypedCommand'

export class Loop extends CompoundCommand {
  loopCount: number
  startTime: Timestamp

  constructor({
    loopCount,
    startTime,
    commands,
  }: {
    loopCount: number
    startTime: string | number | Timestamp
    commands?: TypedCommand[]
  }) {
    super({
      event: 'L',
      commands,
    })
    this.loopCount = loopCount
    this.startTime =
      startTime instanceof Timestamp ? startTime : new Timestamp(startTime)
  }
}
