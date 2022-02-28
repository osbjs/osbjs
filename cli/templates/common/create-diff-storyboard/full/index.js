const { DiffSpecificStoryboard } = require('@osbjs/osbjs')
const { path, filename } = require('./osbjs.config.js')
const { Main } = require('./scenes/Main')

let storyboard = new DiffSpecificStoryboard(filename, path)

storyboard.registerComponents(new Main())

storyboard.generate()
