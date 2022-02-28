import { Sprite, Animation, Sample } from '../Components'

export interface IStoryboardLayers {
	background: (Sprite | Animation)[]
	foreground: (Sprite | Animation)[]
	fail: (Sprite | Animation)[]
	pass: (Sprite | Animation)[]
	overlay: (Sprite | Animation)[]
	sample: Sample[]
}
