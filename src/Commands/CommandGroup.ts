import { Command } from '.'
import { Commandable } from '../Components'

export abstract class CommandGroup extends Commandable {
	header: string
	commands: Command[]

	constructor(header: string) {
		super()
		this.header = header
		this.commands = []
	}

	getOsbString(): string {
		let str: string = this.header
		this.commands.forEach((command) => {
			str += `  ${command.getOsbString()}\n`
		})
		return str
	}
}
