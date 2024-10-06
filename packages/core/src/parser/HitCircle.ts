import { HitObject } from './HitObject'

export class HitCircle extends HitObject {
  override toString(): string {
    let result = `${this.position.x},${this.position.y},${this.time},${this.type},${this.hitSound}`
    if (this.hitSample) result += `,${this.hitSample}`

    return result
  }
}
