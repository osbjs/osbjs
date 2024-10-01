export class Break {
  startTime: number
  endTime: number

  constructor({ startTime, endTime }: { startTime: number; endTime: number }) {
    this.startTime = startTime
    this.endTime = endTime
  }

  toString() {
    return `2,${this.startTime},${this.endTime}`
  }
}
