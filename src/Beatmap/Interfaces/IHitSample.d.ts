import { SampleSet } from '../Enums/SampleSet'

export interface IHitSample {
	normalSet: SampleSet
	additionSet: SampleSet
	index: number | undefined
	volume: number | undefined
	filename: string | undefined
}
