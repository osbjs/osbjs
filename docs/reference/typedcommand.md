# TypedCommand

::: info
Inherits: [Command](./command)
:::

A command that takes a specific type.

## Generics

### `T`

- Type: `string | number | Vector2 | Color3` ([Vector2](./vector2), [Color3](./color3))

## Constructor details

```ts
new TypedCommand<T>({
  event,
  startTime,
  endTime,
  startValue,
  endValue,
  easing,
})
```

- Parameters:
  - `event` (`string`): Name of the command.
  - `startTime` (`string | number | Timestamp`) ([Timestamp](./timestamp)): Start time of the command.
  - `endTime` (`string | number | Timestamp | undefined`) ([Timestamp](./timestamp)): End time of the command. Defaults to `undefined`.
  - `startValue` (`T`) ([T](#t)): Start value of the command.
  - `endValue` (`T | undefined`): End value of the command. Defaults to `undefined`.
  - `easing` (`Easing | undefined`) ([Easing](./easing)): The easing function for this command. Defaults to `undefined`.

## Properties

_Properties inherited from [Command](./command):_

[`startTime`](./command#startTime)

### `endTime`

The end time of this command.

- Type: `Timestamp` ([Timestamp](./timestamp.md))

### `startValue`

The start value of this command.

- Type: `T` ([T](#t))

### `endValue`

The end value of this command.

- Type: `T` ([T](#t))

### `easing`

The easing function for this command.

- Type: `Easing` ([Easing](./easing.md))
