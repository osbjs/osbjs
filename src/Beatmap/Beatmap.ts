import { IBeatmapDifficulty } from './Interfaces/IBeatmapDifficulty'
import { IBeatmapMetadata } from './Interfaces/IBeatmapMetadata'
import { readFileSync, existsSync } from 'fs'
import { getAudioFilename, parseColors, parseDifficulty, parseHitObjects, parseMetadata, parseTimingPoints } from './Utils/ParserHelpers'
import { IColor } from './Interfaces/IColor'
import { ITimingPoint } from './Interfaces/ITimingPoint'
import { IBeatmapHitObjects } from './Interfaces/IBeatmapHitObjects'

export class Beatmap {
	path: string
	difficulty: IBeatmapDifficulty
	metadata: IBeatmapMetadata
	colors: IColor[]
	hitObjects: IBeatmapHitObjects
	timingPoints: ITimingPoint[]
	audioFilename: string
	private _raw: string

	constructor(path: string) {
		this.path = path
		if (!existsSync(path)) throw new Error("File doesn't exists")

		this._raw = readFileSync(this.path, 'utf-8')
		this.difficulty = parseDifficulty(this._raw)
		this.metadata = parseMetadata(this._raw)
		this.colors = parseColors(this._raw)
		this.hitObjects = parseHitObjects(this._raw)
		this.timingPoints = parseTimingPoints(this._raw)
		this.audioFilename = getAudioFilename(this._raw)
	}
}
