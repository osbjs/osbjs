import type { Graphic } from './Graphic'
import type { Sample } from './Sample'

/**
 * A container of storyboard objects.
 */
export class Container {
  readonly children: (Container | Graphic | Sample)[]

  constructor(props?: { children?: (Container | Graphic | Sample)[] }) {
    this.children = props?.children || []
  }

  /**
   * Returns the flattened container tree.
   */
  toFlatten() {
    const result: (Graphic | Sample)[] = []

    for (const child of this.children) {
      if (child instanceof Container) {
        result.push(...child.toFlatten())
      } else {
        result.push(child)
      }
    }

    return result
  }

  toString() {
    let result = ''
    for (const child of this.children) {
      result += child.toString()
    }

    return result
  }
}
