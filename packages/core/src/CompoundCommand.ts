import { Command } from './Command'
import type { TypedCommand } from './TypedCommand'

export class CompoundCommand extends Command {
  readonly commands: TypedCommand[] = []

  constructor({ event }: { event: string }) {
    super({ event })
  }
}
