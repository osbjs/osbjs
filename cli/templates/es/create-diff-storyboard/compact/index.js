import { DiffSpecificStoryboard } from '@osbjs/osbjs'
import { path, filename } from './osbjs.config.js'

let storyboard = new DiffSpecificStoryboard(filename, path)

storyboard.generate()
