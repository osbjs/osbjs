import { CompoundCommand } from './CompoundCommand'
import type { Timestamp } from './Timestamp'

export class LoopCommand extends CompoundCommand {
  loopCount: number
  startTime: Timestamp

  constructor({
    loopCount,
    startTime,
  }: {
    loopCount: number
    startTime: Timestamp
  }) {
    super({
      event: 'L',
    })
    this.loopCount = loopCount
    this.startTime = startTime
  }
}
