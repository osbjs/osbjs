import { Timestamp } from '../types/Timestamp'
import { CompoundCommand } from './CompoundCommand'
import type { TypedCommand } from './TypedCommand'

/**
 * 
 */
export class Loop extends CompoundCommand {
  readonly loopCount: number

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
      startTime,
    })
    this.loopCount = loopCount
  }
}
