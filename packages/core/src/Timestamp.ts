import { clamp } from './maths'

/**
 * Represents a timestamp in the format mm:ss:msmsms.
 */
export class Timestamp {
  private minutes: number
  private seconds: number
  private milliseconds: number

  constructor(input: string | number) {
    if (typeof input === 'string') {
      const splitted = input.split(':')
      if (splitted.length !== 3) throw new Error('Invalid input type for Timestamp')

      const [mm, ss, ms] = splitted.map(Number)
      this.minutes = clamp(mm!, 0, 60)
      this.seconds = clamp(ss!, 0, 60)
      this.milliseconds = clamp(ms!, 0, 999)
    } else if (typeof input === 'number') {
      this.minutes = Math.floor(input / 60000)
      input %= 60000
      this.seconds = Math.floor(input / 1000)
      this.milliseconds = input % 1000
    } else {
      throw new Error('Invalid input type for Timestamp')
    }
  }

  toString(): string {
    return this.toMilliseconds().toString()
  }
  
  toMilliseconds(): number {
    return this.minutes * 60000 + this.seconds * 1000 + this.milliseconds
  }
}
