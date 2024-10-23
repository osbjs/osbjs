import { Animation } from './Animation'
import { Graphic } from './Graphic'
import { Sample } from './Sample'
import { Sprite } from './Sprite'

/**
 * A container of storyboard objects.
 */
export class Component {
  readonly children: (Component | Graphic | Sample)[]

  constructor(props?: { children?: (Component | Graphic | Sample)[] }) {
    this.children = props?.children || []
  }

  /**
   * Returns the flattened container tree.
   */
  toFlatten() {
    const result: (Graphic | Sample)[] = []

    for (const child of this.children) {
      if (child instanceof Component) {
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
      result += `${child}\n`
    }

    return result.trimEnd()
  }
}
