import { Command } from './Command'
import type { TypedCommand } from './TypedCommand'

/** These commands don't do anything by themselves,
 *  but they provide conditions for when other events happen.
 */
export abstract class CompoundCommand extends Command {
  readonly commands: TypedCommand[] = []

  constructor({ event }: { event: string }) {
    super({ event })
  }
}
