import { type Node } from './Node'

export enum ElementType {
  Graphics,
  Sample,
}

export interface Element extends Node {
  readonly elementType: ElementType
}
