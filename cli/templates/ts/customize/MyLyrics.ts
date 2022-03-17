import { IColor, Component, Sprite, OsbVector2, SubtitleCollection, Layer, Origin, Parameter, TextureGenerator } from '@osbjs/osbjs'

export class MyLyrics extends Component {
	name = 'MyLyrics'
	folderPath: string
	osbFolderPath: string
	options = {
		fadeDuration: 200,
		opacity: 1,
		fontName: 'Arial',
		fontSize: 72,
		fontScale: 1,
		perCharacter: false,
		y: 400,
		additive: true,
		color: {
			r: 255,
			g: 255,
			b: 255,
		},
	}
	private _textureGenerator: TextureGenerator
	private _subtitleCollection: SubtitleCollection

	constructor(folderPath: string, osbFolderPath: string, subtitlePath: string, options?: LyricsOptions, registerFontOptions?: FontOptions) {
		super()
		this.folderPath = folderPath
		this.osbFolderPath = osbFolderPath
		this.options = { ...this.options, ...options }

		this._textureGenerator = new TextureGenerator(folderPath, osbFolderPath, { fontName: this.options.fontName, fontSize: this.options.fontSize })
		if (registerFontOptions) this._textureGenerator.registerFont(registerFontOptions.fontPath, registerFontOptions.family)
		this._subtitleCollection = new SubtitleCollection(subtitlePath)
	}

	override generate() {
		if (this.options.perCharacter) {
			this._generatePerChar()
		} else {
			this._generatePerLine()
		}
	}

	private _generatePerChar() {
		this._subtitleCollection.subtitles.forEach((subtitle) => {
			let letterY = this.options.y
			subtitle.text.split('\n').forEach((line) => {
				let lineWidth = 0,
					lineHeight = 0

				for (let i = 0; i < line.length; i++) {
					const letter = line[i]
					let { width, height } = this._textureGenerator.getTextDimensions(letter, {}, true)
					lineWidth += width * this.options.fontScale
					lineHeight = Math.max(lineHeight, height * this.options.fontScale)
				}

				let letterX = 320 - lineWidth * 0.5

				for (let i = 0; i < line.length; i++) {
					const letter = line[i]
					let texture = this._textureGenerator.generateTexture(letter, this.options.color, {}, true)

					let position = new OsbVector2(letterX, letterY)

					let sprite = new Sprite(texture.osbPath, Layer.Background, Origin.TopLeft, position)
					sprite.ScaleAtTime(subtitle.startTime, this.options.fontScale)
					sprite.Fade(subtitle.startTime - this.options.fadeDuration, subtitle.startTime, 0, this.options.opacity)
					sprite.Fade(subtitle.endTime - this.options.fadeDuration, subtitle.endTime, this.options.opacity, 0)
					if (this.options.additive)
						sprite.Parameter(subtitle.startTime - this.options.fadeDuration, subtitle.endTime, Parameter.AdditiveBlending)

					this.registerComponents(sprite)

					letterX += texture.width * this.options.fontScale
				}

				letterY += lineHeight
			})
		})
	}

	private _generatePerLine() {
		this._subtitleCollection.subtitles.forEach((line) => {
			let texture = this._textureGenerator.generateTexture(line.text, this.options.color)
			let position = new OsbVector2(320, this.options.y)

			let sprite = new Sprite(texture.osbPath, Layer.Background, Origin.Center, position)
			sprite.ScaleAtTime(line.startTime, this.options.fontScale)
			sprite.Fade(line.startTime - this.options.fadeDuration, line.startTime, 0, this.options.opacity)
			sprite.Fade(line.endTime - this.options.fadeDuration, line.endTime, this.options.opacity, 0)
			if (this.options.additive) sprite.Parameter(line.startTime - this.options.fadeDuration, line.endTime, Parameter.AdditiveBlending)

			this.registerComponents(sprite)
		})
	}
}

export interface LyricsOptions {
	fadeDuration?: number
	opacity?: number
	fontName?: string
	fontSize?: number
	fontScale?: number
	perCharacter?: boolean
	y?: number
	additive?: boolean
	color?: IColor
}

export interface FontOptions {
	fontPath: string
	family: string
}
