import { Command, CommandType } from './Command'
import type { TypedCommand } from './TypedCommand'

export enum CompoundCommandType {
  TriggerCommand,
  LoopCommand,
}

export class CompoundCommand extends Command {
  readonly compoundCommandType: CompoundCommandType
  commands: TypedCommand[] = []

  constructor({
    event,
    compoundCommandType,
  }: {
    event: string
    compoundCommandType: CompoundCommandType
  }) {
    super({ event, commandType: CommandType.CompoundCommand })
    this.compoundCommandType = compoundCommandType
  }
}
