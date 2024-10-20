import { Timestamp } from '../types/Timestamp'

export class Break {
  startTime: Timestamp
  endTime: Timestamp

  constructor({ startTime, endTime }: { startTime: number; endTime: number }) {
    this.startTime = new Timestamp(startTime)
    this.endTime = new Timestamp(endTime)
  }

  toString() {
    return `2,${this.startTime},${this.endTime}`
  }
}
