# osbjs

A minimalist component-based osu! storboarding framework.

> Note: osbjs uses `node-canvas` for generating text so make sure you have `node-gyp` installed. Read [this section](https://github.com/nodejs/node-gyp#installation) for more info on how to install `node-gyp` for your operating system.

## Install
```
npm i @osbjs/osbjs
```

## Example

```js
const { Storyboard, Sprite, Easing, Position, Origin, Layer } = require('@osbjs/osbjs')

// Create storyboard instance
// If `path` is not specified, osbjs will create a new `storyboard` folder and save the storyboard there.
const sb = new Storyboard('Taishi feat. Hatsune Miku (Eng ver) - Scaler (Smug Nanachi).osb')

// Create a sprite
let sprite1 = new Sprite('sb/test.png', Layer.Background)
sprite1.Move(1000, 3000, new Position(320, 345), new Position(240, 480))

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
const { Sprite, Component, Layer, ScaleVector } = require('@osbjs/osbjs')

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
const { Flash } = require('./components/Flash')

let fl = new Flash(0, 3000)
scene.registerComponents(fl)
```

## Join my discord for updates (WIP)
https://discord.gg/t2sHY8TdMA

## Documentation

1. **Storyboard**
   - [Storyboard](#storyboard)
       - [`registerComponents`](#storyboardregistercomponents)
       - [`generate`](#storyboardgenerate)
   - [DiffSpecificStoryboard](#diffspecificstoryboard)
       - [`registerComponents`](#diffspecificstoryboardregistercomponents)
       - [`generate`](#diffspecificstoryboardgenerate)
2. **Components**
   - [Component](#component)
       - [`registerComponents`](#componentregistercomponents)
       - [`generate`](#componentgenerate)
   - [Sprite](#sprite)
       - [`Fade`](#spritefade)
       - [`FadeAtTime`](#spritefadeattime)
       - [`Move`](#spritemove)
       - [`MoveAtTime`](#spritemoveattime)
       - [`MoveX`](#spritemovex)
       - [`MoveXAtTime`](#spritemovexattime)
       - [`MoveY`](#spritemovey)
       - [`MoveYAtTime`](#spritemoveyattime)
       - [`Scale`](#spritescale)
       - [`ScaleAtTime`](#spritescaleattime)
       - [`ScaleVec`](#spritescalevec)
       - [`ScaleVecAtTime`](#spritescalevecattime)
       - [`Rotate`](#spriterotate)
       - [`RotateAtTime`](#spriterotateattime)
       - [`Color`](#spritecolor)
       - [`ColorAtTime`](#spritecolorattime)
       - [`Parameter`](#spriteparameter)
       - [`ParameterAtTime`](#spriteparameterattime)
       - [`Loop`](#spriteloop)
           - [Loop group](#loop)
       - [`Trigger`](#spritetrigger)
          - [Trigger group](#trigger)
   - [Animation](#animation)
   - [Sample](#sample)
   - [Scene](#scene)
3. **Utils**
	- [OsbColor](#osbcolor)
	- [OsbVector2](#osbvector2)
	- [SubtitleCollection](#subtitlecollection)
	- [Texture](#texture)
	- [TextureGenerator](#texturegenerator)
	- [`rgbToHex`](#rgbtohex)
    - [`parseOsuTimestamp`](#parseosutimestamp)
	- MathHelpers
    	- [`randInt`](#mathhelpersrandint)
    	- [`randFloat`](#mathhelpersrandfloat)
    	- [`degToRad`](#mathhelpersdegtorad)
    	- [`radToDeg`](#mathhelpersradtodeg)
    	- [`addVec2`](#mathhelpersaddvec2)
    	- [`subVec2`](#mathhelperssubvec2)
    	- [`multiplyVec2`](#mathhelpersmultiplyvec2)
    	- [`divideVec2`](#mathhelpersdividevec2)
    	- [`multiplyScalarVec2`](#mathhelpersmultiplyscalarvec2)
    	- [`divideScalarVec2`](#mathhelpersdividescalarvec2)
    	- [`dotVec2`](#mathhelpersdotvec2)
    	- [`crossVec2`](#mathhelperscrossvec2)
    	- [`lengthVec2`](#mathhelperslengthvec2)
    	- [`lengthSqVec2`](#mathhelperslengthsqvec2)
    	- [`normalizeVec2`](#mathhelpersnormalizevec2)
    	- [`equalsVec2`](#mathhelpersequalsvec2)
4. **Enums**
	- [Easing](#easing)
    - [Layer](#layer)
	- [Origin](#origin)
	- [LoopType](#looptype)
	- [Parameter](#parameter)
	- [SampleLayer](#samplelayer)
	- [TriggerName](#triggername)
5. **Types**
	- [ISubtitle](#isubtitle)
	- [IFontProperties](#ifontproperties)
	- [IColor](#icolor)
	- [IStoryboardLayers](#istoryboardlayers)
	- [IVector2](#ivector2)

### Storyboard
```ts
const sb = new Storyboard(filename: string, path: string = './storyboard')
```
Create a new storyboard instance.
* **filename**: osb filename.
* **path**: full path to beatmap folder.

### Storyboard#`registerComponents`
```ts
sb.registerComponents(...components: Component[])
```
Register components to this storyboard. You can supply as many components as you want. Note: later component will have higher z-index therefore it might appear on top of earlier components if their active time overlap.

### Storyboard#`generate`
```ts
sb.generate()
```
Generate storyboard. Call this after every component is registered.

### DiffSpecificStoryboard
```ts
const sb = new DiffSpecificStoryboard(filename: string, path: string)
```
Create a new storyboard instance for a specific difficulty.
* **filename**: osu filename.
* **path**: full path to beatmap folder.

### DiffSpecificStoryboard#`registerComponents`
Similar to [Storyboard#registerComponents](#storyboardregistercomponents)

### DiffSpecificStoryboard#`generate`
Similar to [Storyboard#generate](#storyboardgenerate)

### Component
Abstract class. To create your own component, extend this class.

### Component#`registerComponents`
```ts
component.registerComponents(...components)
```
Register components to this component. You can supply as many components as you want. Note: later component will have higher z-index therefore it might appear on top of earlier components if their active time overlap.

### Component#`generate`
This function will be called internally. By default this function doesn't do anything, its purpose is to add logic to extended component.
If you create new sprites/animations inside `generate` function, make sure to register them.

#### Example
```ts
export class Flash extends Component {
	constructor(startTime, endTime) {
		super(startTime, endTime)
	}

	generate() {
		// create sprite
		let fl = new Sprite('sb/dot.png', Layer.Background)
		fl.ScaleVec(this.startTime, this.startTime, new ScaleVector(854, 480), new ScaleVector(854, 480))
		fl.Fade(this.startTime, this.endTime, 1, 0)
		// register sprite
		this.registerComponents(fl)
	}
}
```

### Sprite
```ts
const sprite = new Sprite(path: string, layer: Layer, origin: Origin = Origin.Center, initialPosition: OsbVector2 = new OsbVector2(320, 480))
```
Create a new sprite. A sprite is also a component, therefore you can register it to storyboard directly, or add it to another components.

* **path**: path to the image file relative to the beatmap folder. For example, if you have a subfolder named `sb` inside your beatmap folder and your image file named `background.jpg` is in it then you must pass `sb/background.jpg` without the dot at the start.
* **layer**: [Layer](#layer)
* **origin**: [Origin](#origin)
* **initialPosition**: the initial position of the image.

### Sprite#`Fade`
```ts
sprite.Fade(startTime: number, endTime: number, startOpacity: number, endOpacity: number, easing: Easing = Easing.Linear)
```
* **startTime**, **endTime**: times in milliseconds indicate when the event will occur
* **startOpacity**, **endOpacity**: opacity at the start/end of the animation
* **easing**: [Easing](#easing)

### Sprite#`FadeAtTime`
```ts
sprite.FadeAtTime(time: number, opacity: number)
```
Shorthand command for [Fade](#spritefade) when `startTime` and `endTime` are equal.
* **time**: time in millisecond indicates when the event will occur.
* **opacity**: opacity at the given time.

### Sprite#`Move`
```ts
sprite.Move(startTime: number, endTime: number, startPosition: OsbVector2, endPosition: OsbVector2, easing: Easing = Easing.Linear)
```
* **startTime**, **endTime**: times in milliseconds indicate when the event will occur.
* **startPosition**, **endPosition**: position at the start/end of the animation.
* **easing**: [Easing](#easing)

### Sprite#`MoveAtTime`
```ts
sprite.MoveAtTime(time: number, position: OsbVector2)
```
Shorthand command for [Move](#spritemove) when `startTime` and `endTime` are equal.
* **time**: time in millisecond indicates when the event will occur.
* **position**: position at the given time.

### Sprite#`MoveX`
```ts
sprite.MoveX(startTime: number, endTime: number, startX: number, endX: number, easing: Easing = Easing.Linear)
```
* **startTime**, **endTime**: times in milliseconds indicate when the event will occur.
* **startX**, **endX**: x position at the start/end of the animation.
* **easing**: [Easing](#easing)

### Sprite#`MoveXAtTime`
```ts
sprite.MoveXAtTime(time: number, x: number)
```
Shorthand command for [MoveX](#spritemovex) when `startTime` and `endTime` are equal.
* **time**: time in millisecond indicates when the event will occur.
* **x**: x position at the given time.

### Sprite#`MoveY`
```ts
sprite.MoveY(startTime: number, endTime: number, startY: number, endY: number, easing: Easing = Easing.Linear)
```
* **startTime**, **endTime**: times in milliseconds indicate when the event will occur.
* **startY**, **endY**: y position at the start/end of the animation.
* **easing**: [Easing](#easing)

### Sprite#`MoveYAtTime`
```ts
sprite.MoveYAtTime(time: number, y: number)
```
Shorthand command for [MoveY](#spritemovey) when `startTime` and `endTime` are equal.
* **time**: time in millisecond indicates when the event will occur.
* **y**: y position at the given time.

### Sprite#`Scale`
```ts
sprite.Scale(startTime: number, endTime: number, startScale: number, endScale: number, easing: Easing = Easing.Linear)
```
* **startTime**, **endTime**: times in milliseconds indicate when the event will occur.
* **startScale**, **endScale**: scale factor at the start/end of the animation.
* **easing**: [Easing](#easing)

### Sprite#`ScaleAtTime`
```ts
sprite.ScaleAtTime(time: number, scale: number)
```
Shorthand command for [`Scale`](#spritescale) when `startTime` and `endTime` are equal.
* **time**: time in millisecond indicates when the event will occur.
* **scale**: scale factor at the given time.

### Sprite#`ScaleVec`
```ts
sprite.Scale(startTime: number, endTime: number, startScale: OsbVector2, endScale: OsbVector2, easing: Easing = Easing.Linear)
```
* **startTime**, **endTime**: times in milliseconds indicate when the event will occur.
* **startScale**, **endScale**: scale factor at the start/end of the animation.
* **easing**: [Easing](#easing)

### Sprite#`ScaleVecAtTime`
```ts
sprite.ScaleAtTime(time: number, scale: OsbVector2)
```
Shorthand command for [`ScaleVec`](#spritescalevec) when `startTime` and `endTime` are equal.
* **time**: time in millisecond indicates when the event will occur.
* **scale**: scale factor at the given time.

### Sprite#`Rotate`
```ts
sprite.Rotate(startTime: number, endTime: number, startAngle: number, endAngle: number, easing: Easing = Easing.Linear)
```
* **startTime**, **endTime**: times in milliseconds indicate when the event will occur.
* **startAngle**, **endAngle**: angle to rotate by in radians at the start/end of the animation.
* **easing**: [Easing](#easing)

### Sprite#`RotateAtTime`
```ts
sprite.RotateAtTime(time: number, angle: number)
```
Shorthand command for [Rotate](#spriterotate) when `startTime` and `endTime` are equal.
* **time**: time in millisecond indicates when the event will occur.
* **angle**: angle to rotate by in radians at the given time.

### Sprite#`Color`
```ts
sprite.Color(startTime: number, endTime: number, startColor: OsbColor, endColor: OsbColor, easing: Easing = Easing.Linear)
```
* **startTime**, **endTime**: times in milliseconds indicate when the event will occur.
* **startColor**, **endColor**: color at the start/end of the animation. Sprites with (255,255,255) will be their original colour and sprites with (0,0,0) will be totally black. Anywhere in between will result in subtractive colouring.
* **easing**: [Easing](#easing)

### Sprite#`ColorAtTime`
```ts
sprite.ColorAtTime(time: number, scale: OsbColor)
```
Shorthand command for [Color](#spritecolor) when `startTime` and `endTime` are equal.
* **time**: time in millisecond indicates when the event will occur.
* **color**: color at the given time. Sprites with (255,255,255) will be their original colour and sprites with (0,0,0) will be totally black. Anywhere in between will result in subtractive colouring.

### Sprite#`Parameter`
```ts
sprite.Parameter(startTime: number, endTime: number, parameter: Parameter)
```
* **startTime**, **endTime**: times in milliseconds indicate when the event will occur.
* **parameter**: [Parameter](#parameter)

### Sprite#`ParameterAtTime`
```ts
sprite.ParameterAtTime(time: number, parameter: Parameter)
```
* **time**: time in millisecond indicates when the event will occur.
* **parameter**: effect [Parameter](#parameter) to apply.

### Sprite#`Loop`
```ts
sprite.Loop(group: Loop)
```
Add a loop group to this sprite
* group: a [Loop](#loop) group.

### Loop group
```ts
const loop = new Loop(startTime: number, count: number)
```
Loops can be defined to repeat a set of events constantly for a set number of iterations.

Note that events inside a loop should be timed with a **zero-base**. This means that you should start from 0ms for the inner event's timing and work up from there. The loop event's start time will be added to this value at game runtime.

* **startTime**: time of the first loop's start.
* **count**: number of times to repeat the loop.

Loop has all of [Sprite](#sprite)'s methods except `Loop` and `Trigger`.

#### Example:
```js
// create a loop group
const loop = new Loop(1000, 3)
loop.Fade(0, 1000, 1, 0.5) // this means sprite will start to fade at 1000, 2000 and 3000 respectively.

// add loop group to sprite
sprite.loop(loop)
```

### Sprite#`Trigger`
```ts
sprite.Trigger(group: Trigger)
```
Add a trigger group to this sprite
* group: a [Trigger](#loop) group.

### Trigger group
```ts
const trigger = new Trigger(triggerName: TriggerName | string, startTime: number, endTime: number)
```

Trigger loops can be used to trigger animations based on play-time events. Although called loops, trigger loops only execute once when triggered.

Trigger loops are zero-based similar to normal loops. If two overlap, the first will be halted and replaced by a new loop from the beginning.
If they overlap any existing storyboarded events, they will not trigger until those transformations are no in effect.

* **triggerName**: [TriggerName](#TriggerName) for more info, see https://osu.ppy.sh/wiki/en/Storyboard/Scripting/Compound_Commands
* **startTime**: when the trigger is valid.
* **endTime**: when the trigger stops being valid.

Trigger has all of [Sprite](#sprite)'s methods except `Loop` and `Trigger`.

#### Example:
```js
// create a trigger group
const trigger = new Trigger(TriggerName.HitSoundClap, 1000, 3000)
trigger.Fade(0, 1000, 1, 0.5) // this means sprite will start to fade if clap hitsound is played during the time 1000 and 3000.

// add trigger group to sprite
sprite.trigger(trigger)
```

### Animation
```ts
const animation = new Animation(path: string, layer: Layer, origin: Origin = Origin.Center,  frameCount: number, frameDelay: number, initialPosition: OsbVector2 = new OsbVector2(320, 480), loopType: LoopType | string = LoopType.LoopForever)
```

Create a new animation. A animation is also a component, therefore you can register it to storyboard directly, or add it to another components.

* **path**: path to the image file relative to the beatmap folder. For example, specify a filename like "sliderball.png", and name your files "sliderball0.png" to "sliderball9.png" for a 10 frame animation.
* **layer**: [Layer](#layer)
* **origin**: [Origin](#origin)
* **frameCount**: number of frames in the animation.
* **frameDelay**: delay in milliseconds between each frame.
* **initialPosition**: [OsbVector2](#osbvector2)
* **loopType**: [LoopType](#looptype)

Animation has all of [Sprite](#sprite)'s methods.

### Sample
```ts
const sample = new Sample(startTime: number, layer: SampleLayer, path: string, volume: number = 100)
```
* **startTime**: time in milliseconds to start playing the sound effect
* **layer**: [SampleLayer](#samplelayer)
* **path**: relative path to the sound file.
* **volume**: volume of the sound file. (1-100)

### Scene
An "empty" `Component`. Its purpose is to make working with groups of components syntactically clearer.

### SubtitleCollection
```ts
new SubtitleCollection(path: string)
```

* **path**: full path to lyrics file. File types supported: `srt`, `vtt`

Property:
* **subtitles**: [`ISubtitle`](#isubtitle)[]

### Texture
```ts
new Texture(text: string, path: string, osbPath: string)
```

* **text**: text
* **path**: full path to texture image.
* **osbPath**: relative path to texture image.

Properties:
* **width**: `number`
* **height**: `number`

### TextureGenerator
```ts
const txtGen = new TextureGenerator(folderPath: string, osbPath: string)
```
* **folderPath**: full path to the folder that will be used to save generated text images.
* **osbPath**: relative path to the folder that will be used to save generated text images.

Properties:
* **fontProps**: [`IFontProperties`](#ifontproperties) can be used to set font

### TextureGenerator#`generateTexture`
```ts
txtGen.generateTexture(text: string) : Texture
```
Generate and save text image. Returns [Texture](#texture).

### TextureGenerator#`getTexture`
```ts
txtGen.getTexture(text: string) : Texture | undefined
```
Get generated [Texture](#texture) from cache, and return undefined if not exists. Use [`generateTexture`](#texturegeneratorgeneratetexture) instead.

### TextureGenerator#`emptyDir`
```ts
txtGen.emptyDir()
```
Clear folder that is used to save generated text image.

### TextureGenerator#`registerFont`
```ts
txtGen.registerFont(fontPath: string, family: string, weight?: string, style?: string)
```
Register a new font. Must be called before [`generateTexture`](#texturegeneratorgeneratetexture) if you are using a font file that is not installed as a system font. `family`, `weight`, `style` must follow css `@font-face` rules.

* **fontPath**: full path to font file.
* **family**: font family.
* **weight**: font weight.
* **style**: font style.

### `rgbToHex`
```ts
function rgbToHex(r: number, g: number, b: number): string
```

Converts rgb color to its corresponding hex string.

### `parseOsuTimestamp`
```ts
function parseOsuTimestamp(timestamp: string): number
```

Converts osu timestamp to miliseconds.

### MathHelpers#`randInt`
```ts
function randInt(low: number, high: number)
```
Random integer in the interval [low, high].

### MathHelpers#`randFloat`
```ts
function randFloat(low: number, high: number) 
```
Random float in the interval [low, high].

### MathHelpers#`degToRad`
```ts
function degToRad(degrees: number)
```
Converts degrees to radians.

### MathHelpers#`radToDeg`
```ts
function radToDeg(radians: number)
```
Converts radians to degrees.

### MathHelpers#`addVec2`
```ts
function addVec2(v1: IVector2, v2: IVector2): IVector2
```
Returns `v1` + `v2`

### MathHelpers#`subVec2`
```ts
function subVec2(v1: IVector2, v2: IVector2): IVector2
```
Returns `v1` - `v2`

### MathHelpers#`multiplyVec2`
```ts
function multiplyVec2(v1: IVector2, v2: IVector2): IVector2
```
Multiply `v1` by `v2`

### MathHelpers#`divideVec2`
```ts
function divideVec2(v1: IVector2, v2: IVector2): IVector2
```
Divide `v1` by `v2`

### MathHelpers#`multiplyScalarVec2`
```ts
function multiplyScalarVec2(v: IVector2, s: number): IVector2
```
Multiply `v` by scalar `s`

### MathHelpers#`divideScalarVec2`
```ts
function divideScalarVec2(v: IVector2, s: number): IVector2
```
Divide `v` by scalar `s`

### MathHelpers#`dotVec2`
```ts
function dotVec2(v1: IVector2, v2: IVector2): number
```
Calculates the dot product of `v1` and `v2`.

### MathHelpers#`crossVec2`
```ts
function crossVec2(v1: IVector2, v2: IVector2): number
```
Calculates the cross product of `v1` and `v2`.

### MathHelpers#`lengthVec2`
```ts
function lengthVec2(v: IVector2): number
```
Computes the Euclidean length (straight-line length) from (0, 0) to (v.x, v.y).

### MathHelpers#`lengthSqVec2`
```ts
function lengthSqVec2(v: IVector2): number
```
Computes the square of the Euclidean length (straight-line length) from (0, 0) to (v.x, v.y).

### MathHelpers#`normalizeVec2`
```ts
function normalizeVec2(v: IVector2): IVector2
```
Converts `v` to a unit vector - that is, returns a vector with the same direction as this one, but length 1.

### MathHelpers#`equalsVec2`
```ts
function equalsVec2(v1: IVector2, v2: IVector2): boolean
```
Returns true if the components of `v1` and `v2` are strictly equal; false otherwise.

### Easing
- `Linear`
- `Out`
- `In`
- `InQuad`
- `OutQuad`
- `InOutQuad`
- `InCubic`
- `OutCubic`
- `InOutCubic`
- `InQuart`
- `OutQuart`
- `InOutQuart`
- `InQuint`
- `OutQuint`
- `InOutQuint`
- `InSine`
- `OutSine`
- `InOutSine`
- `InExpo`
- `OutExpo`
- `InOutExpo`
- `InCirc`
- `OutCirc`
- `InOutCirc`
- `InElastic`
- `OutElastic`
- `OutElasticHalf`
- `OutElasticQuarter`
- `InOutElastic`
- `InBack`
- `OutBack`
- `InOutBack`
- `InBounce`
- `OutBounce`
- `InOutBounce`
  
### Layer
- `Background`
- `Foreground`
- `Fail`
- `Pass`
  
### Origin
- `TopLeft`
- `Centre` / `Center`
- `CentreLeft` / `CenterLeft`
- `TopRight`
- `BottomCentre` / `BottomCenter`
- `TopCentre` / `TopCenter`
- `CentreRight` / `CenterRight`
- `BottomLeft`
- `BottomRight`
  
### LoopType
- `LoopForever`
- `LoopOnce`
  
### Parameter
- `None`
- `FlipHorizontal`
- `FlipVertical`
- `AdditiveBlending`
  
### SampleLayer
- `Background`
- `Foreground`
- `Fail`
- `Pass`
  
### TriggerName
- `HitSound`
- `HitSoundClap`
- `HitSoundWhistle`
- `HitSoundFinish`
- `Passing`
- `Failing`

### OsbColor
```ts
new OsbColor(r: number, g: number, b: number)
```

* **r**: red
* **g**: green
* **b**: blue

Only use with sprite/animation.

### OsbVector2
```ts
new OsbVector2(x: number, y: number)
```

* **x**: x value of this vector
* **y**: y value of this vector

Only use with sprite/animation.

### ISubtitle
```ts
interface ISubtitle { startTime: number, endTime: number, text: string }
```

### IColor
```ts
interface IColor { r: number, g: number, b: number }
```

### IStoryboardLayers
```ts
interface IStoryboardLayers{
	background: (Sprite | Animation)[]
	foreground: (Sprite | Animation)[]
	fail: (Sprite | Animation)[]
	pass: (Sprite | Animation)[]
	sample: Sample[]
}
```

### IFontProperties
```ts
interface IFontProperties {
	fontSize: number
	fontName: string
}
```

### IVector2
```ts
interface IVector2 {
	x: number
	y: number
}
```
