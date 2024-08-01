import { CompoundCommand, CompoundCommandType } from './CompoundCommand'
import type { Timestamp } from './Timestamp'

export class LoopCommand extends CompoundCommand {
  /** The number of times the loop executes before stopping */
  loopCount: number
  /** The timestamp at which the loop begins */
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
      compoundCommandType: CompoundCommandType.LoopCommand,
    })
    this.loopCount = loopCount
    this.startTime = startTime
  }
}
