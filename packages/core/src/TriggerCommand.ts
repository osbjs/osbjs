import { CompoundCommand, CompoundCommandType } from './CompoundCommand'
import type { Timestamp } from './Timestamp'

export type SampleSet = 'All' | 'Normal' | 'Soft' | 'Drum' | ''
export type Addition = 'Whistle' | 'Finish' | 'Clap' | ''
export type CustomSampleSet = number | ''
export type TriggerType =
  `HitSound${SampleSet}${SampleSet}${Addition}${CustomSampleSet}`

export class TriggerCommand extends CompoundCommand {
  readonly triggerType: TriggerType
  readonly startTime: Timestamp
  readonly endTime: Timestamp

  constructor({
    triggerType,
    startTime,
    endTime,
  }: {
    triggerType: TriggerType
    startTime: Timestamp
    endTime: Timestamp
  }) {
    super({
      event: 'T',
      compoundCommandType: CompoundCommandType.TriggerCommand,
    })
    this.triggerType = triggerType
    this.startTime = startTime
    this.endTime = endTime
  }
}
