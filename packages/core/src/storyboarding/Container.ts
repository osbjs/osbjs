import { Animation } from './Animation'
import { Graphic } from './Graphic'
import { Sample } from './Sample'
import { Sprite } from './Sprite'

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

  toOsbString() {
    let result = '[Events]\n//Background and Video events\n'

    const layers: Record<
      'bg' | 'fail' | 'pass' | 'fg' | 'ov',
      (Animation | Sprite)[]
    > & {
      s: Sample[]
    } = {
      bg: [],
      fail: [],
      pass: [],
      fg: [],
      ov: [],
      s: [],
    }

    const flatten = this.toFlatten()
    for (const obj of flatten) {
      if (obj instanceof Sample) {
        layers.s.push(obj)
      }
      if (obj instanceof Sprite || obj instanceof Animation) {
        switch (obj.layer) {
          case 'Background':
            layers.bg.push(obj)
            break
          case 'Foreground':
            layers.bg.push(obj)
            break
          case 'Fail':
            layers.fail.push(obj)
            break
          case 'Pass':
            layers.pass.push(obj)
            break
          case 'Overlay':
            layers.ov.push(obj)
            break
        }
      }
    }

    result += '//Storyboard Layer 0 (Background)\n'
    for (const o of layers.bg) {
      result += `${o}\n`
    }

    result += '//Storyboard Layer 1 (Fail)\n'
    for (const o of layers.fail) {
      result += o
    }

    result += '//Storyboard Layer 2 (Pass)\n'
    for (const o of layers.pass) {
      result += o
    }

    result += '//Storyboard Layer 3 (Foreground)\n'
    for (const o of layers.fg) {
      result += o
    }

    result += '//Storyboard Layer 4 (Overlay)\n'
    for (const o of layers.ov) {
      result += o
    }

    result += '//Storyboard Sound Samples\n'
    for (const o of layers.s) {
      result += o
    }

    return result.trimEnd()
  }

  toString() {
    let result = ''
    for (const child of this.children) {
      result += `${child}\n`
    }

    return result.trimEnd()
  }
}
