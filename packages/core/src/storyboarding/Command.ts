export abstract class Command {
  readonly event: string
  constructor({ event }: { event: string }) {
    this.event = event
  }
}
