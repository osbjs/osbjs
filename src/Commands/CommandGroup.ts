import { Command } from '.'

export abstract class CommandGroup {
	header: string
	commands: Command[]

	constructor(header: string) {
		this.header = header
		this.commands = []
	}

	addCommands(...command: Command[]) {
		this.commands = this.commands.concat(command)
	}

	getOsbString(): string {
		let str: string = this.header
		this.commands.forEach((command) => {
			str += `  ${command.getOsbString()}\n`
		})
		return str
	}
}
