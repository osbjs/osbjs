# osbjs

A minimalist component-based osu! storboarding framework.

## Important annoucement


## Install
```
npm i @osbjs/osbjs
```

## Example

```js
const { Storyboard, Sprite, Easing, OsbVector2, Origin, Layer } = require('@osbjs/osbjs')

// Create storyboard instance
// If `path` is not specified, osbjs will create a new `storyboard` folder and save the storyboard there.
const sb = new Storyboard('Taishi feat. Hatsune Miku (Eng ver) - Scaler (Smug Nanachi).osb')

// Create a sprite
let sprite1 = new Sprite('sb/test.png', Layer.Background)
sprite1.Move(1000, 3000, new OsbVector2(320, 345), new OsbVector2(240, 480))

// You can also pass timestamp string to startTime/endTime/time argument.
// timestamp must be in osu timestamp format `mm:ss:fff`
sprite1.Move('00:04:000', '00:05:000', new OsbVector2(320, 345), new OsbVector2(240, 480)) // this works too

let sprite2 = new Sprite('sb/beam.png', Layer.Background)
sprite2.Fade(1, 1, 1, 0)

// Create a scene
let scene = new Scene()

// Add sprite to scene
scene.registerComponents(sprite)

// Register scene
sb.registerComponents(scene)

// Generate
sb.generate()
```

Since osbjs is component-based, you can create your own `Component` and reuse it anywhere else. Add your logic in the `generate` function and you are good to go!

```js
// components/Flash.js
const { Sprite, Component, Layer, OsbVector2 } = require('@osbjs/osbjs')

module.exports = class Flash extends Component {
	constructor(startTime, endTime) {
		super()
        this.startTime = startTime
        this.endTime = endTime
	}

	generate() {
		let fl = new Sprite('sb/dot.png', Layer.Background)
		fl.ScaleVec(this.startTime, this.startTime, new OsbVector2(854, 480), new OsbVector2(854, 480))
		fl.Fade(this.startTime, this.endTime, 1, 0)
		this.registerComponents(fl)
	}
}

// main.js
const Flash = require('./components/Flash')

let fl = new Flash(0, 3000)
scene.registerComponents(fl)
```

>Note: osbjs does NOT support async/await/promise. Everything called underhood is synchronous.

## Documentation
Visit [documentation page](https://osbjs.vercel.app)

## Join discord for updates & discussion
https://discord.gg/t2sHY8TdMA
