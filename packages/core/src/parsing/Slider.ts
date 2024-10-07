import type { Timestamp } from '../types/Timestamp'
import type { Vector2 } from '../types/Vector2'
import { HitObject } from './HitObject'
import type { HitSample } from './HitSample'
import type { SampleSet } from './SampleSet'

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
  edgeSets?: [SampleSet, SampleSet][]

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
    edgeSets?: [SampleSet, SampleSet][]
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
}
