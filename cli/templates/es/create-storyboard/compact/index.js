import { Storyboard } from '@osbjs/osbjs'
import { path, filename } from './osbjs.config.js'

let storyboard = new Storyboard(filename, path)

storyboard.generate()
