export enum NodeType {
  Group,
  Element,
  Command,
}

export interface Node {
  readonly nodeType: NodeType
}
