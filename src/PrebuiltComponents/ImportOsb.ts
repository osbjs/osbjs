import {
	Animation,
	Component,
	Easing,
	Layer,
	Loop,
	LoopType,
	Origin,
	OsbColor,
	OsbVector2,
	Parameter,
	Sample,
	SampleLayer,
	Sprite,
	Trigger,
} from '../Core'
import { readFileSync, existsSync } from 'fs'

export class ImportOsb extends Component {
	name: string = 'importOsb'
	private _osb: string
	constructor(osbPath: string) {
		super()
		if (!existsSync(osbPath)) throw new Error("ImportOsb: osb file doesn't exists")

		this._osb = readFileSync(osbPath, 'utf-8')
	}

	generate() {
		const components = getComponentsFromOsb(this._osb)
		components.forEach((component) => {
			this.registerComponents(component)
		})
	}
}

function getComponentsFromOsb(raw: string) {
	let components: (Sprite | Animation | Sample)[] = []
	const sprites: Sprite[] = parseSprites(raw),
		animations: Animation[] = parseAnimations(raw),
		samples: Sample[] = parseSamples(raw)

	components = components.concat(sprites, animations, samples)

	return components
}

function parseSprites(raw: string): Sprite[] {
	let sArr = raw.match(/Sprite,\w+,\w+,\".+\",-*\w+\.*\w*,-*\w+\.*\w*\r*\n((?:[ _]+\w+,\w+,-*\w+\.*\w*,-*\w*\.*\w*,.*\r*\n*)+)/g)?.map((str) => {
		// @ts-ignore
		const { layer, origin, path, x, y } = extractProps(str)
		const sprite = new Sprite(path, layer, origin, new OsbVector2(x, y))

		registerCommands(str, sprite)

		return sprite
	})

	function extractProps(str: string) {
		const _init = str.match(/Sprite,\w+,\w+,\".+\",-*\w+\.*\w*,-*\w+\.*\w*/g)?.toString()

		// @ts-ignore
		const props = _init.split(',')

		const layer = Layer[props[1] as keyof typeof Layer],
			origin = Origin[props[2] as keyof typeof Origin],
			path = props[3].replace(/\"/g, ''),
			x = parseInt(props[4]),
			y = parseInt(props[5])

		return { layer, origin, path, x, y }
	}

	return sArr ?? []
}

function parseSamples(raw: string): Sample[] {
	let sArr = raw.match(/Sample,-*\w+,\w+,\".+\",\w+\.*\w*/g)?.map((str) => {
		// @ts-ignore
		const { startTime, layer, path, volume } = extractProps(str)
		const sample = new Sample(startTime, layer, path, volume)

		return sample
	})

	function extractProps(str: string) {
		const props = str.split(',')

		const startTime = parseInt(props[1]),
			layer = SampleLayer[SampleLayer[parseInt(props[2])] as keyof typeof SampleLayer],
			path = props[3].replace(/\"/g, ''),
			volume = parseInt(props[4])

		return { startTime, layer, path, volume }
	}

	return sArr ?? []
}

function parseAnimations(raw: string): Animation[] {
	let aArr = raw.match(/Animation,\w+,\w+,\".+\",-*\w+\.*\w*,-*\w+\.*\w*,\w+,\w+,\w+\r*\n((?:[ _]+\w+,\w+,-*\w+\.*\w*,-*\w*\.*\w*,.*\r*\n*)+)/g)?.map((str) => {
		// @ts-ignore
		const { layer, origin, path, x, y, frameCount, frameDelay, loopType } = extractProps(str)
		const animation = new Animation(path, layer, origin, frameCount, frameDelay, new OsbVector2(x, y), loopType)

		registerCommands(str, animation)

		return animation
	})

	function extractProps(str: string) {
		const _init = str.match(/Animation,\w+,\w+,\".+\",-*\w+,-*\w+,\w+,\w+,\w+/g)?.toString()

		// @ts-ignore
		const props = _init.split(',')

		const layer = Layer[props[1] as keyof typeof Layer],
			origin = Origin[props[2] as keyof typeof Origin],
			path = props[3].replace(/\"/g, ''),
			x = parseInt(props[4]),
			y = parseInt(props[5]),
			frameCount = parseInt(props[6]),
			frameDelay = parseInt(props[7]),
			loopType = LoopType[props[8] as keyof typeof LoopType]

		return { layer, origin, path, x, y, frameCount, frameDelay, loopType }
	}

	return aArr ?? []
}

function registerCommands(str: string, component: Sprite | Animation) {
	const _commands = str.match(/[ _]+\w+,\w+,-*\w+\.*\w*,-*\w*\.*\w*,.*/g)

	let tempLoop, tempTrigger
	// @ts-ignore
	for (let i = 0; i < _commands.length; i++) {
		// @ts-ignore
		const _command = _commands[i]
		const params = _command.split(',')
		const commandName = params[0].replace(/[ _]+/g, '')

		if (commandName == 'L') {
			const startTime = parseInt(params[1]),
				count = parseInt(params[2])

			tempLoop = new Loop(startTime, count)
		} else if (commandName == 'T') {
			const triggerName = params[1],
				startTime = parseInt(params[2]),
				endTime = params[3] ? parseInt(params[3]) : startTime

			tempTrigger = new Trigger(triggerName, startTime, endTime)
		} else {
			// no longer in group
			if (!_command.startsWith('  ') && !_command.startsWith('__')) {
				if (tempLoop) {
					component.Loop(tempLoop)
					tempLoop = undefined
				}
				if (tempTrigger) {
					component.Trigger(tempTrigger)
					tempTrigger = undefined
				}
			}

			if (tempLoop) {
				registerCommand(_command.replace(/[ _]+/g, ''), tempLoop)
			} else if (tempTrigger) {
				registerCommand(_command.replace(/[ _]+/g, ''), tempTrigger)
			} else {
				registerCommand(_command.replace(/[ _]+/g, ''), component)
			}
		}
	}
}

function registerCommand(command: string, component: Sprite | Animation | Loop | Trigger) {
	const params = command.split(',')
	const commandName = params[0],
		easing = Easing[Easing[parseInt(params[1])] as keyof typeof Easing],
		startTime = parseInt(params[2]),
		endTime = params[3] ? parseInt(params[3]) : startTime

	if (commandName == 'F') {
		const startOpacity = parseFloat(params[4]),
			endOpacity = params[5] ? parseFloat(params[5]) : startOpacity

		component.Fade(startTime, endTime, startOpacity, endOpacity, easing)
	}

	if (commandName == 'S') {
		const startScale = parseFloat(params[4]),
			endScale = params[5] ? parseFloat(params[5]) : startScale

		component.Scale(startTime, endTime, startScale, endScale, easing)
	}

	if (commandName == 'R') {
		const startAngle = parseFloat(params[4]),
			endAngle = params[5] ? parseFloat(params[5]) : startAngle

		component.Rotate(startTime, endTime, startAngle, endAngle, easing)
	}

	if (commandName == 'M') {
		const startX = parseFloat(params[4]),
			startY = parseFloat(params[5]),
			endX = params[6] ? parseFloat(params[6]) : startX,
			endY = params[7] ? parseFloat(params[7]) : startY

		component.Move(startTime, endTime, new OsbVector2(startX, startY), new OsbVector2(endX, endY), easing)
	}

	if (commandName == 'V') {
		const startX = parseFloat(params[4]),
			startY = parseFloat(params[5]),
			endX = params[6] ? parseFloat(params[6]) : startX,
			endY = params[7] ? parseFloat(params[7]) : startY

		component.ScaleVec(startTime, endTime, new OsbVector2(startX, startY), new OsbVector2(endX, endY), easing)
	}

	if (commandName == 'MX') {
		const startX = parseFloat(params[4]),
			endX = params[5] ? parseFloat(params[5]) : startX

		component.MoveX(startTime, endTime, startX, endX, easing)
	}

	if (commandName == 'MY') {
		const startY = parseFloat(params[4]),
			endY = params[5] ? parseFloat(params[5]) : startY

		component.MoveY(startTime, endTime, startY, endY, easing)
	}

	if (commandName == 'P') {
		const p = Parameter[params[4] as keyof typeof Parameter]

		component.Parameter(startTime, endTime, p)
	}

	if (commandName == 'C') {
		const startR = parseFloat(params[4]),
			startG = parseFloat(params[5]),
			startB = parseFloat(params[6]),
			endR = params[7] ? parseFloat(params[7]) : startR,
			endG = params[8] ? parseFloat(params[8]) : startG,
			endB = params[9] ? parseFloat(params[9]) : startB

		component.Color(startTime, endTime, new OsbColor(startR, startG, startB), new OsbColor(endR, endG, endB), easing)
	}
}
