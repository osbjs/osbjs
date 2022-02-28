export function rgbToHex(r: number, g: number, b: number): string {
	if (typeof r !== 'number' || typeof g !== 'number' || typeof b !== 'number' || r > 255 || g > 255 || b > 255) {
		throw new TypeError('Expected three numbers below 256')
	}

	return '#' + (b | (g << 8) | (r << 16) | (1 << 24)).toString(16).slice(1)
}