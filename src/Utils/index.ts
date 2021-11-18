export { OsbColor } from './OsbColor'
export { OsbVector2 } from './OsbVector2'
export { SubtitleCollection } from './SubtitleCollection'

export function rgbToHex(r: number, g: number, b: number): string {
	if (typeof r !== 'number' || typeof g !== 'number' || typeof b !== 'number' || r > 255 || g > 255 || b > 255) {
		throw new TypeError('Expected three numbers below 256')
	}

	return '#' + (b | (g << 8) | (r << 16) | (1 << 24)).toString(16).slice(1)
}

export function parseOsuTimestamp(timestamp: string): number {
	const match = timestamp.match(/^(\d{2,}):(\d{2}):(\d{3})$/)

	if (!match) {
		throw new Error('Invalid osu timestamp format: "' + timestamp + '"')
	}

	const minutes = match[1] ? parseInt(match[1], 10) * 60000 : 0
	const seconds = parseInt(match[2], 10) * 1000
	const milliseconds = parseInt(match[3], 10)

	return minutes + seconds + milliseconds
}
