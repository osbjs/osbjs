import { DiffSpecificStoryboard } from '@osbjs/osbjs'
import { path, filename } from './osbjs.config.js'
import { Main } from './scenes/Main.js'

let storyboard = new DiffSpecificStoryboard(filename, path)

storyboard.registerComponents(new Main())

storyboard.generate()
