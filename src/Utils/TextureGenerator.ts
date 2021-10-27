import { createCanvas, registerFont as canvasRegisterFont } from 'canvas'
import { emptyDirSync, outputFileSync } from 'fs-extra'
import path from 'path'
import { imageSize } from 'image-size'

export class TextureGenerator {
	private _cache: Texture[]
	fontProps: FontProperties = {
		fontName: 'Arial',
		fontSize: 72,
	}
	folderPath: string
	osbPath: string
	constructor(folderPath: string, osbPath: string) {
		this._cache = []
		this.folderPath = folderPath
		this.osbPath = osbPath
	}

	/** alias for node-canvas' `registerFont` */
	registerFont(fontPath: string, family: string, weight?: string, style?: string) {
		canvasRegisterFont(fontPath, { family, weight, style })
	}

	generateTexture(text: string): Texture | null {
		let texture = this.getTexture(text)
		if (texture) return texture

		const measure = this._measureText(text)
		const height = Math.abs(measure.actualBoundingBoxAscent) + Math.abs(measure.actualBoundingBoxDescent)
		const canvas = createCanvas(measure.width, height)
		const ctx = canvas.getContext('2d')

		ctx.font = `${this.fontProps.fontSize}px "${this.fontProps.fontName}"`
		ctx.textBaseline = 'top'
		ctx.fillText(text, 0, 0)

		const texturePath = path.join(this.folderPath, this.osbPath, `_${this._cache.length}.png`)
		texture = new Texture(text, texturePath, this.osbPath)

		this._cache.push(texture)

		this._saveTexture(canvas.toDataURL('image/png'), texture.path)

		return texture
	}

	getTexture(text: string) {
		return this._cache.find((t) => t.text == text)
	}

	/** alias for fs-extra' `emptyDirSync` */
	emptyDir(path: string) {
		emptyDirSync(path)
	}

	private _measureText(text: string): TextMetrics {
		const canvas = createCanvas(500, 500)
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

export class Texture {
	text: string
	path: string
	osbPath: string
	width: number
	height: number

	constructor(text: string, path: string, osbPath: string) {
		this.text = text
		this.path = path
		this.osbPath = osbPath
		this.width = this._getWidth()
		this.height = this._getHeight()
	}

	private _getWidth(): number {
		return imageSize(this.path).width ?? 0
	}

	private _getHeight(): number {
		return imageSize(this.path).height ?? 0
	}
}

export interface FontProperties {
	fontSize: number
	fontName: string
}
