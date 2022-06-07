import type { IColor } from '../../Core'

export interface ILyricsOptions {
	/**
	 * Duration of the fade in/out.
	 * @default 200
	 */
	fadeDuration?: number
	/**
	 * Opacity of the text.
	 * @default 1
	 */
	opacity?: number
	/**
	 * Font name.
	 * @default 'Arial'
	 */
	fontName?: string
	/**
	 * Font size.
	 * @default 72
	 */
	fontSize?: number
	/**
	 * Font scale.
	 * @default 1
	 */
	fontScale?: number
	/**
	 * Whether to generate a sprite per character.
	 * @default false
	 */
	perCharacter?: boolean
	/**
	 * Y position of the text.
	 * @default 400
	 */
	y?: number
	/**
	 * Whether to use additive blending.
	 * @default true
	 */
	additive?: boolean
	/**
	 * Color of the text.
	 * @default {r: 255, g: 255, b: 255}
	 */
	color?: IColor
}
