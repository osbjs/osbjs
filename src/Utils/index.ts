export { OsbColor } from './OsbColor'
export { OsbVector2 } from './OsbVector2'
export * as MathHelpers from './MathHelpers'
export { TextureGenerator } from './TextureGenerator'
export { Texture } from './Texture'
export { Subtitle } from './Subtitle'
export { SubtitleCollection } from './SubtitleCollection'
/** for convenient */
export { parseTimestamp } from 'subtitle'

export function rgbToHex(r: number, g: number, b: number) {
	if (typeof r !== 'number' || typeof g !== 'number' || typeof b !== 'number' || r > 255 || g > 255 || b > 255) {
		throw new TypeError('Expected three numbers below 256')
	}

	return '#' + (b | (g << 8) | (r << 16) | (1 << 24)).toString(16).slice(1)
}
