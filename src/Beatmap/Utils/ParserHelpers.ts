import { IBeatmapDifficulty } from '../Interfaces/IBeatmapDifficulty'
import { IBeatmapMetadata } from '../Interfaces/IBeatmapMetadata'
import { ITimingPoint } from '../Interfaces/ITimingPoint'
import { IColor } from '../Interfaces/IColor'
import { Spinner } from '../HitObjects/Spinner'
import { Hitsound } from '../Enums/Hitsound'
import { IHitSample } from '../Interfaces/IHitSample'
import { Slider } from '../HitObjects/Slider'
import { Circle } from '../HitObjects/Circle'
import { ISliderParams } from '../Interfaces/ISliderParams'
import { IBeatmapHitObjects } from '../Interfaces'
import { Vector2 } from '../../Math'

export function parseMetadata(raw: string): IBeatmapMetadata {
	const title = raw.match(/(?<=Title:)(.*)/)
	const artist = raw.match(/(?<=Artist:)(.*)/)
	const creator = raw.match(/(?<=Creator:)(.*)/)
	const difficulty = raw.match(/(?<=Version:)(.*)/)

	return {
		title: title![0],
		artist: artist![0],
		creator: creator![0],
		difficulty: difficulty![0],
	}
}

export function parseColors(raw: string): IColor[] {
	if (raw.match(/\[Colours\]/)) {
		let colors: IColor[] = []

		const matches = raw.match(/(?<=Combo[0-9]+ : )(.*)/g)

		if (matches) {
			for (let i = 0; i < matches.length; i++) {
				const c = matches[i].split(',')

				colors.push({
					r: parseInt(c[0]),
					g: parseInt(c[1]),
					b: parseInt(c[2]),
				})
			}

			return colors
		}
	}

	return [
		{ r: 255, g: 192, b: 0 },
		{ r: 0, g: 202, b: 0 },
		{ r: 18, g: 124, b: 255 },
		{ r: 242, g: 24, b: 57 },
	]
}

export function parseHitObjects(raw: string): IBeatmapHitObjects {
	let a = raw
		.match(/(?<=\[HitObjects]\r*\n)(.+\r*\n)+/g)
		?.toString()
		.trim()

	if (!a) return { spinners: [], sliders: [], circles: [] }

	let spinners: Spinner[] = parseSpinner(a).sort((a, b) => a.startTime - b.startTime)
	let sliders: Slider[] = parseSlider(a, raw).sort((a, b) => a.startTime - b.startTime)
	let circles: Circle[] = parseCircle(a).sort((a, b) => a.startTime - b.startTime)

	return { spinners, sliders, circles }
}

function parseSlider(rawHitObjects: string, raw: string): Slider[] {
	let sliders: Slider[] = []
	let sliderPattern = /-*\d+,-*\d+,-*\d+,\d+,\d+,(L|B|C|P)(\|-*\d+:-*\d+)+,\d+,\d+\.*\d*(,\d+(\|\d*)*,\d+:\d+(\|\d+:\d+)*,\d+:\d+:\d+:\d+:\w*)*/g

	let sArr = rawHitObjects.match(sliderPattern)
	if (sArr) {
		for (const sLine of sArr) {
			let sAttr = sLine.split(',')

			let x = parseInt(sAttr[0])
			let y = parseInt(sAttr[1])

			let startTime = parseInt(sAttr[2])

			let hitsound: Hitsound = parseInt(sAttr[4])

			let curves = sAttr[5].split('|')
			let curveType = curves[0]
			let curvePoints: Vector2[] = curves.slice(1).map((cp) => new Vector2(parseInt(cp.split(':')[0]), parseInt(cp.split(':')[1])))
			let slides = parseInt(sAttr[6])
			let length = parseInt(sAttr[7])
			let edgeSounds: Hitsound[] = sAttr[8] ? sAttr[8].split('|').map((es) => parseInt(es)) : []
			let edgeSets: IHitSample[] = sAttr[9]
				? sAttr[9].split('|').map((es) => {
						let hs = es.split(':')
						return {
							normalSet: parseInt(hs[0]),
							additionSet: parseInt(hs[1]),
							index: undefined,
							volume: undefined,
							filename: undefined,
						}
				  })
				: []

			let params: ISliderParams = {
				curveType,
				curvePoints,
				slides,
				length,
				edgeSounds,
				edgeSets,
			}

			let hs = sAttr[10] ? sAttr[10].split(':') : ['0', '0', '0', '0', '']
			let hitSample: IHitSample = {
				normalSet: parseInt(hs[0]),
				additionSet: parseInt(hs[1]),
				index: parseInt(hs[2]),
				volume: parseInt(hs[3]),
				filename: hs[4],
			}

			const timingPoints = parseTimingPoints(raw)
			const { sliderMultiplier } = parseDifficulty(raw)

			let currentTimingPoint = timingPoints
				.filter((tPoint) => tPoint.time <= startTime && tPoint.uninherited)
				.sort((t1, t2) => t2.time - t1.time)[0]

			let currentMultipliers = timingPoints
				.filter((tPoint) => tPoint.time <= startTime && !tPoint.uninherited && tPoint.time >= currentTimingPoint.time)
				.sort((t1, t2) => t2.time - t1.time)
			let currentMultiplier = currentMultipliers.length ? -currentMultipliers[0].beatLength / 100 : 1

			let slider = new Slider(x, y, startTime, hitsound, hitSample, params, sliderMultiplier, currentTimingPoint, currentMultiplier)

			sliders.push(slider)
		}
	}

	return sliders
}

function parseSpinner(raw: string): Spinner[] {
	let spinners: Spinner[] = []
	let spinnerPattern = /(?<=,)(-*\d+,-*\d+,-*\d+,\d+,\d+,\d+:\d+:\d+:\d+:\w*)/g

	let sArr = raw.match(spinnerPattern)
	if (sArr) {
		for (const sLine of sArr) {
			let sAttr = sLine.split(',')

			let startTime = parseInt(sAttr[2])
			let endTime = parseInt(sAttr[5])
			let hitsound: Hitsound = parseInt(sAttr[4])

			let hs = sAttr[6] ? sAttr[6].split(':') : ['0', '0', '0', '0', '']

			let hitSample: IHitSample = {
				normalSet: parseInt(hs[0]),
				additionSet: parseInt(hs[1]),
				index: parseInt(hs[2]),
				volume: parseInt(hs[3]),
				filename: hs[4],
			}

			let spinner = new Spinner(startTime, endTime, hitsound, hitSample)

			spinners.push(spinner)
		}
	}

	return spinners
}

function parseCircle(raw: string): Circle[] {
	let circles: Circle[] = []
	let circlePattern = /-*\d+,-*\d+,-*\d+,\d+,\d+,\d+:\d+:\d+:\d+:\w*/g

	let cArr = raw.match(circlePattern)
	if (cArr) {
		for (const cLine of cArr) {
			let cAttr = cLine.split(',')

			let x = parseInt(cAttr[0])
			let y = parseInt(cAttr[1])
			let startTime = parseInt(cAttr[2])
			let hitsound: Hitsound = parseInt(cAttr[4])

			let hs = cAttr[5].split(':')

			let hitSample: IHitSample = {
				normalSet: parseInt(hs[0]),
				additionSet: parseInt(hs[1]),
				index: parseInt(hs[2]),
				volume: parseInt(hs[3]),
				filename: hs[4],
			}

			let circle = new Circle(x, y, startTime, hitsound, hitSample)

			circles.push(circle)
		}
	}

	return circles
}

export function parseDifficulty(raw: string): IBeatmapDifficulty {
	const hp = raw.match(/(?<=HPDrainRate:)(.*)/)
	const circleSize = raw.match(/(?<=CircleSize:)(.*)/)
	const overallDifficulty = raw.match(/(?<=OverallDifficulty:)(.*)/)
	const approachRate = raw.match(/(?<=ApproachRate:)(.*)/)
	const sliderMultiplier = raw.match(/(?<=SliderMultiplier:)(.*)/)
	const sliderTickRate = raw.match(/(?<=SliderTickRate:)(.*)/)

	return {
		hp: parseFloat(hp![0]),
		circleSize: parseFloat(circleSize![0]),
		overallDifficulty: parseFloat(overallDifficulty![0]),
		approachRate: parseFloat(approachRate![0]),
		sliderMultiplier: parseFloat(sliderMultiplier![0]),
		sliderTickRate: parseFloat(sliderTickRate![0]),
	}
}

export function parseTimingPoints(raw: string): ITimingPoint[] {
	let tArr = raw
		.match(/(?<=\[TimingPoints]\r*\n)(.+\r*\n)+/g)
		?.toString()
		.trim()
		.match(/-*\d+,-*\d+\.*\d*,\d+,\d+,\d+,\d+,\d+,\d+/g)

	let timingPoints: ITimingPoint[] = []

	if (tArr) {
		for (const tLine of tArr) {
			let tAttr = tLine.split(',')

			let timingPoint: ITimingPoint = {
				time: parseInt(tAttr[0]),
				beatLength: parseFloat(tAttr[1]),
				meter: parseInt(tAttr[2]),
				sampleSet: parseInt(tAttr[3]),
				sampleIndex: parseInt(tAttr[4]),
				volume: parseInt(tAttr[5]),
				uninherited: tAttr[6] === '1',
				kiai: parseInt(tAttr[7], 10).toString(2) == '1',
			}

			timingPoints.push(timingPoint)
		}
	}

	return timingPoints
}

export function getAudioFilename(raw: string): string {
	let res = raw.match(/AudioFilename: .+/g)

	if (!res) return ''
	return res.toString().replace('AudioFilename: ', '')
}
