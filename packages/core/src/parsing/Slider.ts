import { Timestamp } from '../types/Timestamp'
import type { Vector2 } from '../types/Vector2'
import { BezierCurve } from './curves/BezierCurve'
import { CatmullCurve } from './curves/CatmullCurve'
import { CircleCurve } from './curves/CircleCurve'
import { CompositeCurve } from './curves/CompositeCurve'
import type { Curve } from './curves/Curve'
import { HitObject } from './HitObject'
import type { HitSample } from './HitSample'

export const CurveType = {
  Bezier: 'B',
  Catmull: 'C',
  Linear: 'L',
  Perfect: 'P',
} as const

export type CurveType = (typeof CurveType)[keyof typeof CurveType]

export function isCurveType(curveType: unknown): curveType is CurveType {
  return (
    curveType === 'B' ||
    curveType === 'C' ||
    curveType === 'L' ||
    curveType === 'P'
  )
}

export class Slider extends HitObject {
  curveType: CurveType
  curvePoints: Vector2[]
  slides: number
  length: number
  edgeSounds?: number[]
  edgeSets?: [number, number][]
  currentBeatLength?: number
  currentMultiplier?: number
  baseMultiplier?: number
  curve?: Curve

  constructor({
    position,
    time,
    type,
    hitSound,
    hitSample,
    curvePoints,
    curveType,
    slides,
    length,
    edgeSets,
    edgeSounds,
  }: {
    position: Vector2
    time: Timestamp
    type: number
    hitSound: number
    hitSample?: HitSample
    curveType: CurveType
    curvePoints: Vector2[]
    slides: number
    length: number
    edgeSounds?: number[]
    edgeSets?: [number, number][]
  }) {
    super({ position, time, type, hitSound, hitSample })
    this.curvePoints = curvePoints
    this.curveType = curveType
    this.slides = slides
    this.length = length
    this.edgeSets = edgeSets
    this.edgeSounds = edgeSounds
  }

  override toString(): string {
    let result = `${this.position.x},${this.position.y},${this.time},${this.type},${this.hitSound},${this.curveType}|${this.curvePoints.map(p => `${p.x}:${p.y}`).join('|')},${this.slides},${this.length}`
    // either all or none exist at the same time
    if (this.edgeSounds && this.edgeSets && this.hitSample)
      result += `,${this.edgeSounds.join('|')},${this.edgeSets.join('|')},${this.hitSample}`

    return result
  }

  generateCatmullCurve() {
    let curvePoints: Vector2[] = [this.position, ...this.curvePoints]
    const precision = Math.ceil(this.length)
    return new CatmullCurve(curvePoints, precision)
  }

  generateCircleCurve() {
    return new CircleCurve(
      this.position,
      this.curvePoints[0]!,
      this.curvePoints[1]!,
    )
  }

  generateBezierCurve() {
    let curves: Curve[] = []
    let curvePoints: Vector2[] = []
    let precision = Math.ceil(this.length)
    let previousPosition = this.position
    curvePoints.push(previousPosition)

    for (const point of curvePoints) {
      if (point.eq(previousPosition)) {
        if (curvePoints.length > 1) {
          curves.push(new BezierCurve(curvePoints, precision))
        }
      }

      curvePoints.push(point)
      previousPosition = point
    }

    if (curvePoints.length > 1) {
      curves.push(new BezierCurve(curvePoints, precision))
    }

    return new CompositeCurve(curves)
  }

  generateLinearCurve() {
    const curves: Curve[] = []
    let previousPoint = this.position
    for (const point of this.curvePoints) {
      curves.push(new BezierCurve([previousPoint, point], 0))
      previousPoint = point
    }

    return new CompositeCurve(curves)
  }

  positionAtTime(t: number | string | Timestamp, offset = true): Vector2 {
    if (
      !this.currentBeatLength ||
      !this.currentMultiplier ||
      !this.baseMultiplier
    )
      throw new Error(
        'Missing required props: currentBeatLength, currentMultiplier, baseMultiplier. \
        This could be an error from the parser, or this slider was manually created (which is not recommended).',
      )

    if (!this.curve) {
      switch (this.curveType) {
        case 'C':
          this.curve =
            this.curvePoints.length === 1
              ? this.generateLinearCurve()
              : this.generateCatmullCurve()
          break

        case 'B':
          this.curve =
            this.curvePoints.length === 1
              ? this.generateLinearCurve()
              : this.generateBezierCurve()
          break
        case 'P':
          this.curve =
            this.curvePoints.length > 2
              ? this.generateBezierCurve()
              : this.curvePoints.length < 2 ||
                  !CircleCurve.isValid(
                    this.position,
                    this.curvePoints[0]!,
                    this.curvePoints[1]!,
                  )
                ? this.generateLinearCurve()
                : this.generateCircleCurve()
        case 'L':
        default:
          this.curve = this.generateLinearCurve()
          break
      }
    }

    const time =
      t instanceof Timestamp
        ? t.toMilliseconds()
        : typeof t === 'string'
          ? parseInt(t)
          : t
    const startTime = this.time.toMilliseconds()

    if (time < startTime)
      return offset
        ? this.position.add(HitObject.PlayfieldToStoryboardOffset)
        : this.position

    const travelDuration = Math.round(
      (this.currentBeatLength *
        ((this.length * this.currentMultiplier) / this.baseMultiplier)) /
        100,
    )
    const endTime = startTime + travelDuration * this.slides

    if (endTime <= time)
      return this.slides % 2 == 0
        ? this.position
        : this.curve.positionAtDistance(this.length)

    let elapsedSinceStart = time - startTime
    let repeatAtTime = 1

    let progressDuration = elapsedSinceStart
    while (progressDuration > travelDuration) {
      progressDuration -= travelDuration
      repeatAtTime++
    }

    const progress =
      repeatAtTime % 2 != 0
        ? progressDuration / travelDuration
        : 1 - progressDuration / travelDuration

    const playfieldPosition = this.curve.positionAtDistance(
      this.length * progress,
    )

    return offset
      ? playfieldPosition.add(HitObject.PlayfieldToStoryboardOffset)
      : playfieldPosition
  }
}
