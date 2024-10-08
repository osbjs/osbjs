import { Command } from './Command'
import type { TypedCommand } from './TypedCommand'

export abstract class CompoundCommand extends Command {
  readonly commands: TypedCommand[]

  constructor({
    event,
    commands,
  }: {
    event: string
    commands?: TypedCommand[]
  }) {
    super({ event })
    this.commands = commands || []
  }
}
