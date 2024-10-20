import { Vector2 } from '../../types/Vector2'
import { BaseCurve } from './BaseCurve'

export class CircleCurve extends BaseCurve {
  startPoint: Vector2
  midPoint: Vector2
  endPoint: Vector2

  constructor(startPoint: Vector2, midPoint: Vector2, endPoint: Vector2) {
    super()
    this.startPoint = startPoint
    this.midPoint = midPoint
    this.endPoint = endPoint
  }

  override initialize(): void {
    let d =
      2 *
      (this.startPoint.x * (this.midPoint.y - this.endPoint.y) +
        this.midPoint.x * (this.endPoint.y - this.startPoint.y) +
        this.endPoint.x * (this.startPoint.y - this.midPoint.y))
    if (d == 0) throw new Error('Invalid circle curve')

    let startPointLS = this.startPoint.lenSqr()
    let midPointLS = this.midPoint.lenSqr()
    let endPointLS = this.endPoint.lenSqr()

    let centre = new Vector2(
      (startPointLS * (this.midPoint.y - this.endPoint.y) +
        midPointLS * (this.endPoint.y - this.startPoint.y) +
        endPointLS * (this.startPoint.y - this.midPoint.y)) /
        d,
      (startPointLS * (this.endPoint.x - this.midPoint.x) +
        midPointLS * (this.startPoint.x - this.endPoint.x) +
        endPointLS * (this.midPoint.x - this.startPoint.x)) /
        d,
    )

    let radius = this.startPoint.sub(centre).len()

    let startAngle = Math.atan2(
      this.startPoint.y - centre.y,
      this.startPoint.x - centre.x,
    )
    let midAngle = Math.atan2(
      this.midPoint.y - centre.y,
      this.midPoint.x - centre.x,
    )
    let endAngle = Math.atan2(
      this.endPoint.y - centre.y,
      this.endPoint.x - centre.x,
    )

    while (midAngle < startAngle) midAngle += 2 * Math.PI
    while (endAngle < startAngle) endAngle += 2 * Math.PI
    if (midAngle > endAngle) endAngle -= 2 * Math.PI

    this.length = Math.abs((endAngle - startAngle) * radius)
    let precision = Math.round(this.length * 0.125)

    for (let i = 1; i < precision; i++) {
      let progress = i / precision
      let angle = endAngle * progress + startAngle * (1 - progress)

      let position = new Vector2(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius,
      ).add(centre)

      this.distancePosition.push([progress * this.length, position])
    }
  }

  static isValid(startPoint: Vector2, midPoint: Vector2, endPoint: Vector2) {
    return (
      !startPoint.eq(midPoint) &&
      !midPoint.eq(endPoint) &&
      2 *
        (startPoint.x * (midPoint.y - endPoint.y) +
          midPoint.x * (endPoint.y - startPoint.y) +
          endPoint.x * (startPoint.y - midPoint.y)) !==
        0
    )
  }
}
