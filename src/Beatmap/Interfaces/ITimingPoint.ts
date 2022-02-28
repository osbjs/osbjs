import { SampleSet } from '../Enums/SampleSet'

export interface ITimingPoint {
	time: number
	beatLength: number
	meter: number
	sampleSet: SampleSet
	sampleIndex: number
	volume: number
	uninherited: boolean
	kiai: boolean
}
