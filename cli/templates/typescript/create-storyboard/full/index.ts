import { Storyboard } from '@osbjs/osbjs'
import { path, filename } from './osbjs.config.js'
import { Main } from './scenes/Main.js'

let storyboard = new Storyboard(filename, path)

storyboard.registerComponents(new Main())

storyboard.generate()
