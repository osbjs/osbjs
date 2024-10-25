import { Timestamp } from '../types/Timestamp'

export abstract class Command {
  readonly event: string
  readonly startTime: Timestamp

  constructor({
    event,
    startTime,
  }: {
    event: string
    startTime: string | number | Timestamp
  }) {
    this.startTime =
      startTime instanceof Timestamp ? startTime : new Timestamp(startTime)
    this.event = event
  }
}
