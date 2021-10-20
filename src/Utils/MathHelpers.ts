export function randInt(low: number, high: number) {
	return low + Math.floor(Math.random() * (high - low + 1))
}

export function randFloat(low: number, high: number) {
	return low + Math.random() * (high - low)
}

export function degToRad(degrees: number) {
	return (degrees * Math.PI) / 180
}

export function radToDeg(radians: number) {
	return (radians * 180) / Math.PI
}
