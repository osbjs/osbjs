import { createCanvas, registerFont as canvasRegisterFont } from 'canvas'
import { emptyDirSync, outputFileSync } from 'fs-extra'
import path from 'path'
import { Texture } from './Texture'
import { rgbToHex } from '../Core'

export class TextureGenerator {
	private _cache: Texture[]
	fontProps: {
		fontSize: number
		fontName: string
	} = {
		fontName: 'Arial',
		fontSize: 72,
	}
	folderPath: string
	osbFolderPath: string

	/**
	 *
	 * @param folderPath full path to the folder that will be used to save generated text images.
	 * @param osbFolderPath relative path to the folder that will be used to save generated text images. For example: `sb/lyrics`
	 * @param fontProps font properties for the generated text images.
	 */
	constructor(
		folderPath: string,
		osbFolderPath: string,
		fontProps?: {
			fontSize?: number
			fontName?: string
		}
	) {
		this._cache = []
		this.folderPath = folderPath
		this.osbFolderPath = osbFolderPath
		this.fontProps = { ...this.fontProps, ...fontProps }
	}

	/** alias for node-canvas' `registerFont` */
	registerFont(fontPath: string, family: string, weight?: string, style?: string) {
		canvasRegisterFont(fontPath, { family, weight, style })
	}

	/**
	 * Generate and save text image.
	 * Returns a Texture that contains info about the width, height and osb path of the generated image.
	 * @param text Text to be rendered.
	 * @param color Text color.
	 * @param offset Offset will be 0 on each side if not set.
	 * @param withBoundingBox Whether bounding box should be included in the calculation or not.
	 * If you are creating any sorts of per character effect then this should be true
	 * and the Origin should be set to TopLeft, TopCenter or TopRight depends on your need
	 * so that the text can be aligned properly.
	 * However if you just wanna generate a whole line of text then just leave it as false
	 * so your texture doesn't have extra unncessary paddings.
	 */
	generateTexture(
		text: string,
		color: {
			r?: number
			g?: number
			b?: number
		} = {
			r: 0,
			g: 0,
			b: 0,
		},
		offset: {
			left?: number
			right?: number
			top?: number
			bottom?: number
		} = {
			top: 0,
			bottom: 0,
			left: 0,
			right: 0,
		},
		withBoundingBox: boolean = false
	): Texture {
		const defaultOffset = {
				top: 0,
				bottom: 0,
				left: 0,
				right: 0,
			},
			defaultColor = {
				r: 0,
				g: 0,
				b: 0,
			}
		const _offset = { ...defaultOffset, ...offset },
			_color = {
				...defaultColor,
				...color,
			}
		let texture = this._getTexture(text, _color, _offset)
		if (texture) return texture

		const measure = this._measureText(text)
		const height = !withBoundingBox
			? measure.actualBoundingBoxAscent + measure.actualBoundingBoxDescent + _offset.top + _offset.bottom
			: Math.abs(measure.actualBoundingBoxAscent) + measure.actualBoundingBoxDescent + _offset.top + _offset.bottom
		const width = !withBoundingBox
			? measure.actualBoundingBoxLeft + measure.actualBoundingBoxRight + _offset.left + _offset.right
			: Math.abs(measure.actualBoundingBoxLeft) + measure.actualBoundingBoxRight + _offset.left + _offset.right
		const canvas = createCanvas(width, height)
		const ctx = canvas.getContext('2d')

		ctx.font = `${this.fontProps.fontSize}px "${this.fontProps.fontName}"`
		ctx.textBaseline = 'top'
		ctx.fillStyle = rgbToHex(_color.r, _color.g, _color.b)
		const x = !withBoundingBox ? _offset.left + measure.actualBoundingBoxLeft : _offset.left,
			y = !withBoundingBox ? _offset.top + measure.actualBoundingBoxAscent : _offset.top
		ctx.fillText(text, x, y)

		const texturePath = path.join(this.folderPath, this.osbFolderPath, `_${this._cache.length}.png`)

		this._saveTexture(canvas.toDataURL('image/png'), texturePath)

		texture = new Texture(text, texturePath, path.join(this.osbFolderPath, `_${this._cache.length}.png`), _color, _offset)

		this._cache.push(texture)

		return texture
	}

	private _getTexture(
		text: string,
		color: { r: number; g: number; b: number },
		offset: {
			left: number
			right: number
			top: number
			bottom: number
		}
	) {
		return this._cache.find(
			(t) =>
				t.text == text &&
				t.color.r == color.r &&
				t.color.g == color.g &&
				t.color.b == color.b &&
				t.offset.top == offset.top &&
				t.offset.bottom == offset.bottom &&
				t.offset.left == offset.left &&
				t.offset.right == offset.right
		)
	}

	/** alias for fs-extra' `emptyDirSync` */
	emptyDir() {
		emptyDirSync(path.join(this.folderPath, this.osbFolderPath))
	}

	/**
	 * Return text dimensions without caching it.
	 * @param text text to be measured
	 * @param offset offset will be 0 on each side if not set.
	 * @param withBoundingBox Whether bounding box should be included in the calculation or not.
	 * If you are creating any sorts of per character effect then this should be true
	 * and the Origin should be set to TopLeft, TopCenter or TopRight depends on your need
	 * so that the text can be aligned properly.
	 */
	getTextDimensions(
		text: string,
		offset: {
			left?: number
			right?: number
			top?: number
			bottom?: number
		} = {
			top: 0,
			bottom: 0,
			left: 0,
			right: 0,
		},
		withBoundingBox: boolean = false
	) {
		const defaultOffset = {
			top: 0,
			bottom: 0,
			left: 0,
			right: 0,
		}
		const _offset = { ...defaultOffset, ...offset }
		const measure = this._measureText(text)
		const height = !withBoundingBox
			? measure.actualBoundingBoxAscent + measure.actualBoundingBoxDescent + _offset.top + _offset.bottom
			: Math.abs(measure.actualBoundingBoxAscent) + measure.actualBoundingBoxDescent + _offset.top + _offset.bottom
		const width = !withBoundingBox
			? measure.actualBoundingBoxLeft + measure.actualBoundingBoxRight + _offset.left + _offset.right
			: Math.abs(measure.actualBoundingBoxLeft) + measure.actualBoundingBoxRight + _offset.left + _offset.right

		return { width, height }
	}

	private _measureText(text: string): TextMetrics {
		const canvas = createCanvas(5000, 5000)
		const ctx = canvas.getContext('2d')

		ctx.font = `${this.fontProps.fontSize}px "${this.fontProps.fontName}"`
		ctx.textBaseline = 'top'

		return ctx.measureText(text)
	}

	private _saveTexture(uri: string, path: string) {
		let regExMatches = uri.match('data:(image/.*);base64,(.*)')
		if (regExMatches) {
			let buffer = Buffer.from(regExMatches[2], 'base64')

			outputFileSync(path, buffer)
		} else {
			throw new Error('Invalid image URI.')
		}
	}
}
