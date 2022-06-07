import SimplexNoise from 'simplex-noise'

const simplex = new SimplexNoise('177013')

/**
 * 2-dimensional noise function.
 * Returns a number in range from -1 to 1.
 * The result is not actually random;
 * it is based on Simplex noise,
 * which means that the return values for two input values that are near one another tend to be near one another.
 * This type of noise is useful when you want a sequence of seemingly random numbers that don’t vary wildly from one to the other.
 */
export function noise2D(x: number, y: number) {
	return simplex.noise2D(x, y)
}

/**
 * 3-dimensional noise function.
 * Returns a number in range from -1 to 1.
 * The result is not actually random;
 * it is based on Simplex noise,
 * which means that the return values for two input values that are near one another tend to be near one another.
 * This type of noise is useful when you want a sequence of seemingly random numbers that don’t vary wildly from one to the other.
 */
export function noise3D(x: number, y: number, z: number) {
	return simplex.noise3D(x, y, z)
}

/**
 * 4-dimensional noise function.
 * Returns a number in range from -1 to 1.
 * The result is not actually random;
 * it is based on Simplex noise,
 * which means that the return values for two input values that are near one another tend to be near one another.
 * This type of noise is useful when you want a sequence of seemingly random numbers that don’t vary wildly from one to the other.
 */
export function noise4D(x: number, y: number, z: number, w: number) {
	return simplex.noise4D(x, y, z, w)
}

/**
 * Random integer in the interval [low, high].
 */
export function randInt(low: number, high: number): number {
	return low + Math.floor(Math.random() * (high - low + 1))
}

/**
 * Random float in the interval [low, high].
 */
export function randFloat(low: number, high: number): number {
	return low + Math.random() * (high - low)
}
