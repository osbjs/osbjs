import { imageSize } from 'image-size'

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
