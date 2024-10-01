import type { Graphic } from './Graphic'
import type { Sample } from './Sample'

/**
 * A container of storyboard objects.
 */
export class Container {
  children: (Container | Graphic | Sample)[]

  constructor() {
    this.children = []
  }

  flatten() {
    const result: (Graphic | Sample)[] = []

    for (const child of this.children) {
      if (child instanceof Container) {
        result.push(...child.flatten())
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
