export interface IHitObjectHighlightOptions {
	/**
	 * Scale factor of the sprite at the end of each slider highlight animation.
	 * @default 1.2
	 */
	endScale?: number
	/**
	 * Scale factor of the sprite at the start of each slider highlight animation.
	 * @default 1
	 */
	startScale?: number
	/**
	 * How long (in milliseconds) should the highlight sprite start fading in/out.
	 * @default 200
	 */
	fadeDuration?: number
	/**
	 * Used to calculate the timestep between each `Move` command.
	 * The higher the number, the more smooth the animation will be.
	 * @default 8
	 */
	beatDivisor?: number
	/**
	 * Should the highlight follow the slider path?
	 * @default true
	 */
	followSliderPath?: boolean
}
