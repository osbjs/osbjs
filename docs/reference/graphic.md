# Graphic <Badge type="info" text="abstract" />

A base class for any element in the storyboard that can be displayed, including static image and animation.

## Properties

### `layer`

The layer on which the element resides.

- Type: `Layer` ([Layer](./layer))

### `origin`

The origin point of the element.

- Type: `Origin` ([Origin](./origin))

### `path`

The path to the element's resource.

- Type: `string`

### `position`

The position of the element.

- Type: `Vector2` ([Vector2](./vector2))

### `commands`

Array of commands for animations and transformations.

- Type: `Command[]` ([Command](./commands))

## Methods

### `fade(props)`

Change the opacity of the object (how transparent it is).

- Parameters:

  - `props.startTime` (`number | string | Timestamp`) ([Timestamp](./timestamp)): The start time of the animation.
  - `props.endTime` (`number | string | Timestamp | undefined`) ([Timestamp](./timestamp)): The end time of the animation. Defaults to `undefined`.
  - `props.startValue` (`number`): The starting value of the fade.
  - `props.endValue` (`number | undefined`): The ending value of the fade. Defaults to `undefined`.
  - `props.easing` (`Easing | undefined`) ([Easing](./easing)): The easing function for the fade animation. Defaults to `undefined`.

- Returns: `this`

### `move(props)`

Move the object to a new position in the play area.

- Parameters:

  - `props.startTime` (`number | string | Timestamp`) ([Timestamp](./timestamp)): The start time of the animation.
  - `props.endTime` (`number | string | Timestamp | undefined`) ([Timestamp](./timestamp)): The end time of the animation. Defaults to `undefined`.
  - `props.startValue` (`IVector2 | Vector2Tuple`) ([Vector2](./vector2)): The starting value of the move.
  - `props.endValue` (`IVector2 | Vector2Tuple | undefined`) ([Vector2](./vector2)): The ending value of the move. Defaults to `undefined`.
  - `props.easing` (`Easing | undefined`) ([Easing](./easing)): The easing function for the move animation. Defaults to `undefined`.

- Returns: `this`

### `moveX(props)`

Move the object along the x axis.

- Parameters:

  - `props.startTime` (`number | string | Timestamp`) ([Timestamp](./timestamp)): The start time of the animation.
  - `props.endTime` (`number | string | Timestamp | undefined`) ([Timestamp](./timestamp)): The end time of the animation. Defaults to `undefined`.
  - `props.startValue` (`number`): The starting X position of the move.
  - `props.endValue` (`number | undefined`): The ending X position of the move. Defaults to `undefined`.
  - `props.easing` (`Easing | undefined`) ([Easing](./easing)): The easing function for the moveX animation. Defaults to `undefined`.

- Returns: `this`

### `moveY(props)`

Move the object along the y axis.

- Parameters:

  - `props.startTime` (`number | string | Timestamp`) ([Timestamp](./timestamp)): The start time of the animation.
  - `props.endTime` (`number | string | Timestamp | undefined`) ([Timestamp](./timestamp)): The end time of the animation. Defaults to `undefined`.
  - `props.startValue` (`number`): The starting Y position of the move.
  - `props.endValue` (`number | undefined`): The ending Y position of the move. Defaults to `undefined`.
  - `props.easing` (`Easing | undefined`) ([Easing](./easing)): The easing function for the moveY animation. Defaults to `undefined`.

- Returns: `this`

### `scale(props)`

Change the size of the object relative to its original size.

- Parameters:

  - `props.startTime` (`number | string | Timestamp`) ([Timestamp](./timestamp)): The start time of the animation.
  - `props.endTime` (`number | string | Timestamp | undefined`) ([Timestamp](./timestamp)): The end time of the animation. Defaults to `undefined`.
  - `props.startValue` (`number`): The starting scale value or vector.
  - `props.endValue` (`number | undefined`): The ending scale value or vector. Defaults to `undefined`.
  - `props.easing` (`Easing | undefined`) ([Easing](./easing)): The easing function for the scale animation. Defaults to `undefined`.

- Returns: `this`

### `scaleVec(props)`

Scale the object each side individually.

- Parameters:

  - `props.startTime` (`number | string | Timestamp`) ([Timestamp](./timestamp)): The start time of the animation.
  - `props.endTime` (`number | string | Timestamp | undefined`) ([Timestamp](./timestamp)): The end time of the animation. Defaults to `undefined`.
  - `props.startValue` (`IVector2 | Vector2Tuple`) ([Vector2](./vector2)): The starting scale value or vector.
  - `props.endValue` (`IVector2 | Vector2Tuple | undefined`) ([Vector2](./vector2)): The ending scale value or vector.Defaults to `undefined`.
  - `props.easing` (`Easing | undefined`) ([Easing](./easing)): The easing function for the scale animation. Defaults to `undefined`.

- Returns: `this`

### `rotate(props)`

Rotate the object around its origin.

- Parameters:

  - `props.startTime` (`number | string | Timestamp`) ([Timestamp](./timestamp)): The start time of the animation.
  - `props.endTime` (`number | string | Timestamp | undefined`) ([Timestamp](./timestamp)): The end time of the animation. Defaults to `undefined`.
  - `props.startValue` (`number`): The starting rotation angle in radians.
  - `props.endValue` (`number | undefined`): The ending rotation angle in radians. Defaults to `undefined`.
  - `props.easing` (`Easing | undefined`) ([Easing](./easing)): The easing function for the rotate animation. Defaults to `undefined`.

- Returns: `this`

### `color(props)`

Scale the object each side individually.

- Parameters:

  - `props.startTime` (`number | string | Timestamp`) ([Timestamp](./timestamp)): The start time of the animation.
  - `props.endTime` (`number | string | Timestamp | undefined`) ([Timestamp](./timestamp)): The end time of the animation. Defaults to `undefined`.
  - `props.startValue` (`IColor3 | Color3Tuple`) ([Color3](./color3)): The starting color value.
  - `props.endValue` (`IColor3 | Color3Tuple | undefined`) ([Color3](./color3)): The ending color value. Defaults to `undefined`.
  - `props.easing` (`Easing | undefined`) ([Easing](./easing)): The easing function for the color animation. Defaults to `undefined`.

- Returns: `this`

### `flipH(props)`

Flip the element horizontally.

- Parameters:

  - `props.startTime` (`number | string | Timestamp`) ([Timestamp](./timestamp)): The start time of the effect.
  - `props.endTime` (`number | string | Timestamp | undefined`) ([Timestamp](./timestamp)): The end time of the effect. Defaults to `undefined`.

- Returns: `this`

### `flipV(props)`

Flip the element vertically.

- Parameters:

  - `props.startTime` (`number | string | Timestamp`) ([Timestamp](./timestamp)): The start time of the effect.
  - `props.endTime` (`number | string | Timestamp | undefined`) ([Timestamp](./timestamp)): The end time of the effect. Defaults to `undefined`.

- Returns: `this`

### `additive(props)`

Use additive-color blending instead of alpha-blending.

- Parameters:

  - `props.startTime` (`number | string | Timestamp`) ([Timestamp](./timestamp)): The start time of the effect.
  - `props.endTime` (`number | string | Timestamp | undefined`) ([Timestamp](./timestamp)): The end time of the effect. Defaults to `undefined`.

- Returns: `this`

### `startLoopGroup(props)`

Start a loop group.

- Parameters:

  - `props.startTime` (`number | string | Timestamp`) ([Timestamp](./timestamp)): The start time of the loop group.
  - `props.loopCount` (`number`): The number of times to loop.

- Returns: `this`

### `startTriggerGroup(props)`

Start a trigger group.

- Parameters:

  - `props.startTime` (`number | string | Timestamp`) ([Timestamp](./timestamp)): The start time of the trigger group.
  - `props.endTime` (`number | string | Timestamp`) ([Timestamp](./timestamp)): The end time of the trigger group.
  - `props.triggerType` (`TriggerType`) ([TriggerType](./triggertype)): The condition to trigger this group.

### `endGroup()`

End the current loop/trigger group.

- Returns: `this`
