import { Component } from './Component'
import { Command, CommandGroup, Loop, Trigger } from '../Commands'
import { Easing, Parameter } from '../Enums'
import { OsbColor, OsbVector2 } from '../Utils'

export abstract class Commandable extends Component {
	commands: (Command | CommandGroup)[]
	constructor() {
		super()
		this.commands = []
	}

	/**
	 * Change the opacity of the object.
	 * @param startTime Time in milliseconds/timestamp indicate when the event will start.
	 * @param endTime Time in milliseconds/timestamp indicate when the event will end.
	 * @param startOpacity Opacity at the start of the animation.
	 * @param endOpacity Opacity at the end of the animation.
	 * @param easing How the command should "accelerate".
	 */
	Fade(startTime: number | string, endTime: number | string, startOpacity: number, endOpacity: number, easing: Easing = Easing.Linear) {
		this.commands.push(new Command('F', easing, startTime, endTime, startOpacity, endOpacity))
	}

	/**
	 * Shorthand command for `Fade` when `startTime` and `endTime` are equal.
	 * @param time Time in milliseconds/timestamp indicates when the event will occur.
	 * @param opacity Opacity at the given time.
	 */
	FadeAtTime(time: number | string, opacity: number) {
		this.commands.push(new Command('F', Easing.Linear, time, time, opacity, opacity))
	}

	/**
	 * Change the location of the object in the play area.
	 * @param startTime Time in milliseconds/timestamp indicate when the event will start.
	 * @param endTime Time in milliseconds/timestamp indicate when the event will end.
	 * @param startPosition Position at the start of the animation.
	 * @param endPosition Position at the end of the animation.
	 * @param easing How the command should "accelerate".
	 */
	Move(startTime: number | string, endTime: number | string, startPosition: OsbVector2, endPosition: OsbVector2, easing: Easing = Easing.Linear) {
		this.commands.push(new Command('M', easing, startTime, endTime, startPosition, endPosition))
	}

	/**
	 * Shorthand command for `Move` when `startTime` and `endTime` are equal.
	 * @param time Time in milliseconds/timestamp indicates when the event will occur.
	 * @param position Position at the given time.
	 */
	MoveAtTime(time: number | string, position: OsbVector2) {
		this.commands.push(new Command('M', Easing.Linear, time, time, position, position))
	}

	/**
	 * Change the X coordinate of the object.
	 * @param startTime Time in milliseconds/timestamp indicate when the event will start.
	 * @param endTime Time in milliseconds/timestamp indicate when the event will end.
	 * @param startX X coordinate at the start of the animation.
	 * @param endX X coordinate at the end of the animation.
	 * @param easing How the command should "accelerate".
	 */
	MoveX(startTime: number | string, endTime: number | string, startX: number, endX: number, easing: Easing = Easing.Linear) {
		this.commands.push(new Command('MX', easing, startTime, endTime, startX, endX))
	}

	/**
	 * Shorthand command for `MoveX` when `startTime` and `endTime` are equal.
	 * @param time Time in milliseconds/timestamp indicates when the event will occur.
	 * @param x X coordinate at the given time.
	 */
	MoveXAtTime(time: number | string, x: number) {
		this.commands.push(new Command('MX', Easing.Linear, time, time, x, x))
	}

	/**
	 * Change the Y coordinate of the object.
	 * @param startTime Time in milliseconds/timestamp indicate when the event will start.
	 * @param endTime Time in milliseconds/timestamp indicate when the event will end.
	 * @param startY Y coordinate at the start of the animation.
	 * @param endY Y coordinate at the end of the animation.
	 * @param easing How the command should "accelerate".
	 */
	MoveY(startTime: number | string, endTime: number | string, startY: number, endY: number, easing: Easing = Easing.Linear) {
		this.commands.push(new Command('MY', easing, startTime, endTime, startY, endY))
	}

	/**
	 * Shorthand command for `MoveY` when `startTime` and `endTime` are equal.
	 * @param time Time in milliseconds/timestamp indicates when the event will occur.
	 * @param y Y coordinate at the given time.
	 */
	MoveYAtTime(time: number | string, y: number) {
		this.commands.push(new Command('MY', Easing.Linear, time, time, y, y))
	}

	/**
	 * Change the size of the object relative to its original size.
	 * @param startTime Time in milliseconds/timestamp indicate when the event will start.
	 * @param endTime Time in milliseconds/timestamp indicate when the event will end.
	 * @param startScale Scale factor at the start of the animation.
	 * @param endScale Scale factor at the end of the animation.
	 * @param easing How the command should "accelerate".
	 */
	Scale(startTime: number | string, endTime: number | string, startScale: number, endScale: number, easing: Easing = Easing.Linear) {
		this.commands.push(new Command('S', easing, startTime, endTime, startScale, endScale))
		return this
	}

	/**
	 * Shorthand command for `Scale` when `startTime` and `endTime` are equal.
	 * @param time Time in milliseconds/timestamp indicates when the event will occur.
	 * @param scale Scale factor at the given time.
	 */
	ScaleAtTime(time: number | string, scale: number) {
		this.commands.push(new Command('S', Easing.Linear, time, time, scale, scale))
	}

	/**
	 * Change the size of the object relative to its original size, but X and Y scale separately.
	 * @param startTime Time in milliseconds/timestamp indicate when the event will start.
	 * @param endTime Time in milliseconds/timestamp indicate when the event will end.
	 * @param startScale Scale vector at the start of the animation.
	 * @param endScale Scale vector at the end of the animation.
	 * @param easing How the command should "accelerate".
	 */
	ScaleVec(startTime: number | string, endTime: number | string, startScale: OsbVector2, endScale: OsbVector2, easing: Easing = Easing.Linear) {
		this.commands.push(new Command('V', easing, startTime, endTime, startScale, endScale))
	}

	/**
	 * Shorthand command for `ScaleVec` when `startTime` and `endTime` are equal.
	 * @param time Time in milliseconds/timestamp indicates when the event will occur.
	 * @param scale Scale vector at the given time.
	 */
	ScaleVecAtTime(time: number | string, scale: OsbVector2) {
		this.commands.push(new Command('V', Easing.Linear, time, time, scale, scale))
	}

	/**
	 * Change the amount an object is rotated from its original image, in radians, clockwise.
	 * @param startTime Time in milliseconds/timestamp indicate when the event will start.
	 * @param endTime Time in milliseconds/timestamp indicate when the event will end.
	 * @param startAngle Angle to rotate by in radians at the start of the animation.
	 * @param endAngle Angle to rotate by in radians at the end of the animation.
	 * @param easing How the command should "accelerate".
	 */
	Rotate(startTime: number | string, endTime: number | string, startAngle: number, endAngle: number, easing: Easing = Easing.Linear) {
		this.commands.push(new Command('R', easing, startTime, endTime, startAngle, endAngle))
	}

	/**
	 * Shorthand command for `Rotate` when `startTime` and `endTime` are equal.
	 * @param time Time in milliseconds/timestamp indicates when the event will occur.
	 * @param angle Angle to rotate by in radians at the given time.
	 */
	RotateAtTime(time: number | string, angle: number) {
		this.commands.push(new Command('R', Easing.Linear, time, time, angle, angle))
	}

	/**
	 * The virtual light source colour on the object. The colours of the pixels on the object are determined subtractively.
	 * @param startTime Time in milliseconds/timestamp indicate when the event will start.
	 * @param endTime Time in milliseconds/timestamp indicate when the event will end.
	 * @param startColor Color at the start of the animation.
	 * Sprites with (255,255,255) will be their original colour and sprites with (0,0,0) will be totally black.
	 * Anywhere in between will result in subtractive colouring.
	 * @param endColor Color at the start of the animation.
	 * Sprites with (255,255,255) will be their original colour and sprites with (0,0,0) will be totally black.
	 * Anywhere in between will result in subtractive colouring.
	 * @param easing How the command should "accelerate".
	 */
	Color(startTime: number | string, endTime: number | string, startColor: OsbColor, endColor: OsbColor, easing: Easing = Easing.Linear) {
		this.commands.push(new Command('C', easing, startTime, endTime, startColor, endColor))
	}

	/**
	 * Shorthand command for `Color` when `startTime` and `endTime` are equal.
	 * @param time Time in milliseconds/timestamp indicates when the event will occur.
	 * @param color Color at the given time.
	 * Sprites with (255,255,255) will be their original colour and sprites with (0,0,0) will be totally black.
	 * Anywhere in between will result in subtractive colouring.
	 */
	ColorAtTime(time: number | string, color: OsbColor) {
		this.commands.push(new Command('C', Easing.Linear, time, time, color, color))
	}

	/**
	 * Unlike the other commands, which can be seen as setting endpoints along continually-tracked values,
	 * the `Parameter` command apply ONLY while they are active,
	 * i.e.,you can't put a command from timestamps 1000 to 2000 and expect the value to apply at time 3000,
	 * even if the object's other commands aren't finished by that point.
	 * @param startTime Time in milliseconds/timestamp indicate when the event will start.
	 * @param endTime Time in milliseconds/timestamp indicate when the event will end.
	 * @param parameter `Parameter` to apply.
	 */
	Parameter(startTime: number | string, endTime: number | string, parameter: Parameter) {
		this.commands.push(new Command('P', Easing.Linear, startTime, endTime, parameter, parameter))
	}

	/**
	 * Add a loop group to this sprite
	 * @param group A loop group
	 */
	Loop(group: Loop) {
		this.commands.push(group)
	}

	/**
	 * Add a trigger group to this sprite
	 * @param group A trigger group
	 */
	Trigger(group: Trigger) {
		this.commands.push(group)
	}

	abstract getOsbString(): string
}
