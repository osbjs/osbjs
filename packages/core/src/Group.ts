import { ElementType, type Element } from './Element'
import type { Layer } from './Layer'
import { NodeType, type Node } from './Node'

/**
 * A group/container of storyboard objects.
 */
export class Group implements Node {
  nodeType = NodeType.Group
  layers: Record<Layer | 'Sample', Element[]>

  constructor() {
    this.layers = {
      Background: [],
      Foreground: [],
      Fail: [],
      Pass: [],
      Overlay: [],
      Sample: [],
    }
  }

  add(element: Element) {
    switch (element.elementType) {
      case ElementType.Graphics:
        break

      default:
        break
    }
  }
}
