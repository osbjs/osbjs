# TriggerType <Badge type="info" text="type" />

The condition to trigger a group of commands.

```ts
type SampleSet = 'All' | 'Normal' | 'Soft' | 'Drum' | ''
type Addition = 'Whistle' | 'Finish' | 'Clap' | ''
type CustomSampleSet = number | ''
export type TriggerType =
  | `HitSound${SampleSet}${SampleSet}${Addition}${CustomSampleSet}`
  | 'Passing'
  | 'Failing'
```
