import { NodeType, type Node } from './Node'

export enum CommandType {
  TypedCommand,
  CompoundCommand,
}

export abstract class Command implements Node {
  readonly event: string
  readonly commandType: CommandType
  readonly nodeType = NodeType.Command
  constructor({
    event,
    commandType,
  }: {
    event: string
    commandType: CommandType
  }) {
    this.event = event
    this.commandType = commandType
  }
}
