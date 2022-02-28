import { DiffSpecificStoryboard } from '@osbjs/osbjs'
import { path, filename } from './osbjs.config'

let storyboard = new DiffSpecificStoryboard(filename, path)

storyboard.generate()
