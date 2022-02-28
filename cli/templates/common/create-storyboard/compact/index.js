const { Storyboard } = require('@osbjs/osbjs')
const { path, filename } = require('./osbjs.config.js')

let storyboard = new Storyboard(filename, path)

storyboard.generate()
