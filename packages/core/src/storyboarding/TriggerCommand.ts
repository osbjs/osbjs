import type { Timestamp } from '../types/Timestamp'
import { CompoundCommand } from './CompoundCommand'

type SampleSet = 'All' | 'Normal' | 'Soft' | 'Drum' | ''
type Addition = 'Whistle' | 'Finish' | 'Clap' | ''
type CustomSampleSet = number | ''
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
    })
    this.triggerType = triggerType
    this.startTime = startTime
    this.endTime = endTime
  }
}
