# osbjs

A minimalist component-based osu! storboarding framework.

## Install
```
npm i @osbjs/osbjs
```

## Example

```js
import { Storyboard, Sprite, Easing, Position, Origin, Layer } from '@osbjs/osbjs';

// Create storyboard instance
// If `path` is not specified, osbjs will create a new `storyboard` folder and save the storyboard there.
let sb = new Storyboard('Taishi feat. Hatsune Miku (Eng ver) - Scaler (Smug Nanachi).osb');

// Create a sprite
let sprite1 = new Sprite('sb/test.png', Layer.Background)
sprite1.Move(1, 1, new Position(12, 345), new Position(78, 910))

let sprite2 = new Sprite('sb/test.png', Layer.Background)
sprite2.Fade(1, 1, 1, 0)

// Create a scene
let scene = new Scene(123, 456)

// Add sprite to scene
scene.registerComponents(sprite)

// Register scene
sb.registerComponents(scene);

// Generate
sb.generate();
```

Since osbjs is component-based, you can create your own `Component` and reuse it anywhere else. Add your logic in the `generate` function and you are good to go!

```js
// components/Flash.js
import { Sprite, Component, Layer, ScaleVector } from '@osbjs/osbjs';

export class Flash extends Component {
	constructor(startTime, endTime) {
		super(startTime, endTime)
	}

	generate() {
		let fl = new Sprite('sb/dot.png', Layer.Background)
		fl.ScaleVec(this.startTime, this.startTime, new ScaleVector(854, 480), new ScaleVector(854, 480))
		fl.Fade(this.startTime, this.endTime, 1, 0)
		this.registerComponents(fl)
	}
}

// main.js
import { Flash } from './components/Flash'

let fl = new Flash(0, 3000)
scene.registerComponents(fl)
```

## Join my discord for updates (WIP)
https://discord.gg/t2sHY8TdMA

## Documentation

1. Storyboard
   - [Storyboard](https://osbjs.vercel.app/classes/Storyboard.html)
   - [DiffSpecificStoryboard](https://osbjs.vercel.app/classes/DiffSpecificStoryboard.html)
2. Components
   - [Sprite](https://osbjs.vercel.app/classes/Sprite.html)
   - [Animation](https://osbjs.vercel.app/classes/Animation.html)
   - [Sample](https://osbjs.vercel.app/classes/Sample.html)
   - [Scene](https://osbjs.vercel.app/classes/Scene.html)
3. Enums
	- [Easing](https://osbjs.vercel.app/enums/Easing.html)
    - [Layer](https://osbjs.vercel.app/enums/Layer.html)
	- [LoopType](https://osbjs.vercel.app/enums/LoopType.html)
	- [Origin](https://osbjs.vercel.app/enums/Origin.html)
	- [Parameter](https://osbjs.vercel.app/enums/Parameter.html)
4. Utils
	- [Color](https://osbjs.vercel.app/classes/Storyboard.html)
	- [Position](https://osbjs.vercel.app/classes/Position.html)
	- [ScaleVector](https://osbjs.vercel.app/classes/ScaleVector.html)
	- [MathHelpers](https://osbjs.vercel.app/modules/MathHelpers.html)
