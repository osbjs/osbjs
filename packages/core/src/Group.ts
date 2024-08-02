import type { Graphic } from './Graphic'
import type { Sample } from './Sample'

/**
 * A group/container of storyboard objects.
 */
export class Group {
  children: (Group | Graphic | Sample)[]

  constructor() {
    this.children = []
  }

  toOsbString() {
    let result = ''
    for (const child of this.children) {
      result += child.toOsbString()
    }

    return result
  }
}
