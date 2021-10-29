import { Sprite, Animation, Sample } from '..';

export interface IStoryboardLayers {
	background: (Sprite | Animation)[]
	foreground: (Sprite | Animation)[]
	fail: (Sprite | Animation)[]
	pass: (Sprite | Animation)[]
	sample: Sample[]
}
