#!/usr/bin/env node

const { Command } = require('commander')
const packageJson = require('../package.json')
const chalk = require('chalk')
const fs = require('fs-extra')
const path = require('path')
const { execSync } = require('child_process')
const { join } = require('path')
const { createSpinner } = require('nanospinner')
const validateProjectName = require('validate-npm-package-name')

const program = new Command(packageJson.name).version(packageJson.version)
const PROJECT_DIR = process.cwd()
const PACKAGE_JSON_PATH = path.join(PROJECT_DIR, 'package.json')
const TS_CONFIG_PATH = path.join(PROJECT_DIR, 'tsconfig.json')

//#region Create storyboard
program
	.command('create-storyboard')
	.argument('[project-name]', 'project name. Default: current directory where the script was executed', '')
	.option('-d, --diff-specific', 'for diff specific')
	.option('-t, --template <template-name>', 'template name. Available: `common`, `es`, `ts`', 'common')
	.option('-c, --compact', "don't create example components")
	.description('create a new storyboard')
	.action(createStoryboard)

function createStoryboard(_projectName, options) {
	const spinner = createSpinner()
	const projectName = !_projectName ? path.basename(PROJECT_DIR) : _projectName
	const projectDir = !_projectName ? PROJECT_DIR : path.join(PROJECT_DIR, _projectName)

	const validationResult = validateProjectName(projectName)
	if (!validationResult.validForNewPackages) {
		spinner.error({ text: chalk.red('Invalid project name.') })
		const e = [...(validationResult.errors || []), ...(validationResult.warnings || [])]
		e.forEach((error) => {
			console.error(chalk.red(`  * ${error}`))
		})
		process.exit(1)
	}

	const avaiableTemplates = ['es', 'common', 'ts']

	if (!avaiableTemplates.includes(options.template)) {
		console.log(chalk.red('Invalid template name.'))
		process.exit(1)
	}

	// check package.json
	spinner.start({ text: chalk.yellow(`Checking package.json...`) })
	const exists = ensurePackageJson(options.template, projectName, _projectName)
	spinner.success({ text: exists ? chalk.green('Updated package.json') : chalk.green('Created package.json') })

	// install osbjs
	spinner.start({ text: chalk.yellow(`Installing dependencies...`) })
	try {
		installDependencies(['@osbjs/osbjs@latest'], _projectName)
		if (options.template == 'ts') installDependencies(['typescript @tsconfig/node14 -D'])
		spinner.success({ text: chalk.green('Installed dependencies') })
	} catch (e) {
		spinner.error({ text: chalk.red('Could not install osbjs. Try again.') })
		process.exit(1)
	}

	// copy template files
	spinner.start({ text: chalk.yellow(`Copying template files...`) })
	let templatePath = options.diffSpecific
		? path.join(__dirname, 'templates', options.template, 'create-diff-storyboard')
		: path.join(__dirname, 'templates', options.template, 'create-storyboard')

	templatePath = options.compact ? join(templatePath, 'compact') : join(templatePath, 'full')

	createDirectoryContents(templatePath, _projectName)
	spinner.success({ text: chalk.green('Finished copying template files') })

	// generate gitignore
	spinner.start({ text: chalk.yellow(`Generating .gitignore...`) })
	fs.writeFileSync(path.join(projectDir, '.gitignore'), `node_modules`)
	spinner.success({ text: chalk.green('Generated .gitignore') })

	console.log(
		chalk.green(
			'Storyboard generated! Update `path` and `filename` in osbjs.config.js to your path to beatmap folder and osb filename respectively and start coding!'
		)
	)
}

function createDirectoryContents(templatePath, newProjectPath) {
	const templateFiles = fs.readdirSync(templatePath)

	templateFiles.forEach((file) => {
		const origFilePath = path.join(templatePath, file)

		// get stats about the current file
		const stats = fs.statSync(origFilePath)

		if (stats.isFile()) {
			const contents = fs.readFileSync(origFilePath, 'utf8')

			const writePath = path.join(PROJECT_DIR, newProjectPath, file)
			fs.writeFileSync(writePath, contents, 'utf8')
		} else if (stats.isDirectory()) {
			fs.ensureDirSync(path.join(PROJECT_DIR, newProjectPath, file))

			// recursive call
			createDirectoryContents(origFilePath, path.join(newProjectPath, file))
		}
	})
}
// #endregion

//#region Customize pre-built components
program.command('customize <name>').description('customize a pre-built component').action(customizeComponent)

function customizeComponent(name) {
	const template = getTemplateName()
	const ext = template == 'ts' ? 'ts' : 'js'

	const availableComponents = ['background', 'hitobjecthighlight', 'lyrics']

	if (!availableComponents.includes(name)) {
		console.log(`${chalk.red('Error:')} Invalid component name. Available components: background, hitobjecthighlight, lyrics`)
		process.exit(1)
	}

	const componentNames = {
		background: `MyBackground.${ext}`,
		hitobjecthighlight: `MyHitObjectHighlight.${ext}`,
		lyrics: `MyLyrics.${ext}`,
	}

	// copy component files
	copyCustomizedComponent(componentNames[name], template)

	console.log(chalk.green('Component generated!'))
}

function copyCustomizedComponent(name, template) {
	const templatePath = path.join(__dirname, 'templates', template, 'customize')
	const origFilePath = path.join(templatePath, name)
	const filePath = path.join(PROJECT_DIR, 'components', name)
	fs.ensureDirSync(path.join(PROJECT_DIR, 'components'))

	if (fs.existsSync(filePath)) {
		console.log(`${chalk.red('Error:')} There is already a component named ${name} under components folder.`)
		process.exit(1)
	}

	const contents = fs.readFileSync(origFilePath, 'utf8')
	fs.writeFileSync(filePath, contents, 'utf8')
}
//#endregion

//#region Create component
program.command('create-component <name>').description('create a new component').action(createComponent)

function createComponent(name) {
	// check
	const template = getTemplateName(true)

	// copy new component
	copyComponent(name, template)

	console.log(chalk.green('Component generated!'))
}

function copyComponent(name, template) {
	const ext = template == 'ts' ? 'ts' : 'js'
	const origFilePath = path.join(__dirname, 'templates', template, 'create-component', `index.${ext}`)
	const filePath = path.join(PROJECT_DIR, 'components', `${name}.${ext}`)
	fs.ensureDirSync(path.join(PROJECT_DIR, 'components'))

	if (fs.existsSync(filePath)) {
		console.log(`${chalk.red('Error:')} There is already a component named ${name}.${ext} under components folder.`)
		process.exit(1)
	}

	let contents = fs.readFileSync(origFilePath, 'utf8')
	contents = contents.replace(/ComponentName/g, name)
	fs.writeFileSync(filePath, contents, 'utf8')
}
//#endregion

//#region Create scene
program.command('create-scene <name>').description('create a new scene').action(createScene)

function createScene(name) {
	// check
	const template = getTemplateName(true)

	// copy new component
	copyScene(name, template)

	console.log(chalk.green('Scene generated!'))
}

function copyScene(name, template) {
	const ext = template == 'ts' ? 'ts' : 'js'
	const origFilePath = path.join(__dirname, 'templates', template, 'create-scene', `index.${ext}`)
	const filePath = path.join(PROJECT_DIR, 'scenes', `${name}.${ext}`)
	fs.ensureDirSync(path.join(PROJECT_DIR, 'scenes'))

	if (fs.existsSync(filePath)) {
		console.log(`${chalk.red('Error:')} There is already a scene named ${name}.${ext} under scenes folder.`)
		process.exit(1)
	}

	let contents = fs.readFileSync(origFilePath, 'utf8')
	contents = contents.replace(/SceneName/g, name)
	fs.writeFileSync(filePath, contents, 'utf8')
}
//#endregion

//#region Helpers
/**
 * Ensure package.json file exists
 * @param {string} projectName Project name
 * @param {string} template `es`,`common`
 * @returns {boolean} true if file exists, false if not
 */
function ensurePackageJson(template = 'common', projectName = '', inSubfolder = false) {
	const pkgPath = inSubfolder ? path.join(PROJECT_DIR, projectName, 'package.json') : PACKAGE_JSON_PATH

	if (fs.existsSync(pkgPath)) {
		let packageJson = JSON.parse(fs.readFileSync(pkgPath, 'utf8'))
		if (!packageJson.scripts) packageJson.scripts = {}
		if (!packageJson.scripts.build) packageJson.scripts.build = template == 'ts' ? 'tsc && node dist/.' : 'node .'
		if (template == 'es') packageJson.type = 'module'
		fs.writeFileSync(pkgPath, JSON.stringify(packageJson), 'utf8')
		return true
	} else {
		if (inSubfolder) fs.ensureDirSync(path.join(PROJECT_DIR, projectName))
		let packageJson = {
			name: projectName,
			version: '0.1.0',
			scripts: {
				build: template == 'ts' ? 'tsc && node dist/.' : 'node .',
			},
		}
		if (template == 'es') packageJson.type = 'module'
		fs.writeFileSync(pkgPath, JSON.stringify(packageJson), 'utf8')
		return false
	}
}

function installDependencies(dependenciesArr, subfolder = '') {
	let dependencies = dependenciesArr.join(' ')
	let toBeExec = `npm i ${dependencies}`
	if (subfolder) toBeExec = `cd ${subfolder} && ${toBeExec}`
	execSync(toBeExec, { stdio: 'pipe' })
}

function getTemplateName(quiet = false) {
	const spinner = createSpinner()
	// check
	if (!quiet) spinner.start({ text: chalk.yellow(`Checking package.json...`) })
	const exists = ensurePackageJson()
	if (!quiet) spinner.success({ text: exists ? chalk.green('Updated package.json') : chalk.green('Created package.json') })

	let packageJson = JSON.parse(fs.readFileSync(PACKAGE_JSON_PATH, 'utf8'))
	let template = packageJson.type == 'module' ? 'es' : 'common'
	if (fs.existsSync(TS_CONFIG_PATH)) template = 'ts'

	return template
}
//#endregion

// Start program
program.parse(process.argv)
