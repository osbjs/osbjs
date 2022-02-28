import SimplexNoise from 'simplex-noise'

const simplex = new SimplexNoise('177013')

export function noise2D(x: number, y: number) {
	return simplex.noise2D(x, y)
}

export function noise3D(x: number, y: number, z: number) {
	return simplex.noise3D(x, y, z)
}

export function noise4D(x: number, y: number, z: number, w: number) {
	return simplex.noise4D(x, y, z, w)
}

export function randInt(low: number, high: number): number {
	return low + Math.floor(Math.random() * (high - low + 1))
}

export function randFloat(low: number, high: number): number {
	return low + Math.random() * (high - low)
}
