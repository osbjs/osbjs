export class HitSample {
  normalSet: number
  additionSet: number
  index: number
  volume: number
  filename: string

  constructor({
    normalSet,
    additionSet,
    index,
    volume,
    filename = '',
  }: {
    normalSet: number
    additionSet: number
    index: number
    volume: number
    filename?: string
  }) {
    this.normalSet = normalSet
    this.additionSet = additionSet
    this.index = index
    this.volume = volume
    this.filename = filename
  }

  toString() {
    return `${this.normalSet}:${this.additionSet}:${this.index}:${this.volume}:${this.filename}`
  }
}
