const { DiffSpecificStoryboard } = require('@osbjs/osbjs')
const { path, filename } = require('./osbjs.config.js')

let storyboard = new DiffSpecificStoryboard(filename, path)

storyboard.generate()
