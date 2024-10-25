import type { Timestamp } from '../types/Timestamp'
import { Command } from './Command'
import type { TypedCommand } from './TypedCommand'

export abstract class CompoundCommand extends Command {
  readonly commands: TypedCommand[]

  constructor({
    event,
    commands,
    startTime,
  }: {
    event: string
    startTime: string | number | Timestamp
    commands?: TypedCommand[]
  }) {
    super({ event, startTime })
    this.commands = commands || []
  }
}
