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

	generateTexture(
		text: string,
		color?: {
			r: number
			g: number
			b: number
		},
		offset?: {
			left?: number
			right?: number
			top?: number
			bottom?: number
		}
	): Texture {
		let texture = this._getTexture(text)
		if (texture) return texture
		const defaultOffset = {
			top: 0,
			bottom: 0,
			left: 0,
			right: 0,
		}
		const _offset = { ...defaultOffset, ...offset }

		const measure = this._measureText(text)
		const height =
			Math.abs(measure.actualBoundingBoxAscent) + Math.abs(measure.actualBoundingBoxDescent) + Math.abs(_offset.top) + Math.abs(_offset.bottom)
		const width = measure.width + Math.abs(_offset.left) + Math.abs(_offset.right)
		const canvas = createCanvas(width, height)
		const ctx = canvas.getContext('2d')

		ctx.font = `${this.fontProps.fontSize}px "${this.fontProps.fontName}"`
		ctx.textBaseline = 'top'
		if (color) ctx.fillStyle = rgbToHex(color.r, color.g, color.b)
		ctx.fillText(text, _offset.right, _offset.top)

		const texturePath = path.join(this.folderPath, this.osbFolderPath, `_${this._cache.length}.png`)

		this._saveTexture(canvas.toDataURL('image/png'), texturePath)

		texture = new Texture(text, texturePath, path.join(this.osbFolderPath, `_${this._cache.length}.png`))

		this._cache.push(texture)

		return texture
	}

	private _getTexture(text: string) {
		return this._cache.find((t) => t.text == text)
	}

	/** alias for fs-extra' `emptyDirSync` */
	emptyDir() {
		emptyDirSync(path.join(this.folderPath, this.osbFolderPath))
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
