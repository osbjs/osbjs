import { Animation } from './Animation'
import { Component } from './Component'
import type { Graphic } from './Graphic'
import { Sample } from './Sample'
import { Sprite } from './Sprite'

export class Storyboard extends Component {
  constructor(props?: { children?: (Component | Graphic | Sample)[] }) {
    super(props)
  }

  override toString() {
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
}
