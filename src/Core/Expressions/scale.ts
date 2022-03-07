import { Commandable } from '../Components'
import { imageSize } from 'image-size'
import { OsbVector2 } from '../Utils'

export function scaleExact(commandable: Commandable, width: number, height: number, time: number, path: string) {
	const size = imageSize(path)
	if (!size.width || !size.height) throw new Error('Invalid image.')

	commandable.ScaleVecAtTime(time, new OsbVector2(width / size.width, height / size.height))
}
