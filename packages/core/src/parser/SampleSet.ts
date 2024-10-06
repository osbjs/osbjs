export function isValidSampleSet(sampleSet: any): sampleSet is SampleSet {
  return (
    sampleSet === 0 || sampleSet === 1 || sampleSet === 2 || sampleSet === 3
  )
}

export const SampleSet = {
  Default: 0,
  Normal: 1,
  Soft: 2,
  Drum: 3,
} as const

export type SampleSet = (typeof SampleSet)[keyof typeof SampleSet]
