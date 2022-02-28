const { Storyboard } = require('@osbjs/osbjs')
const { path, filename } = require('./osbjs.config.js')
const { Main } = require('./scenes/Main')

let storyboard = new Storyboard(filename, path)

storyboard.registerComponents(new Main())

storyboard.generate()
