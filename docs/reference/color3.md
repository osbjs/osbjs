# Color3

RGB color.

A lot of methods can take in a `Color3Tuple` or `IColor3` shape and turn it into a real `Vector2` under the hood.

```ts
interface IColor3 {
  r: number
  g: number
  b: number
}

type Color3Tuple = [number, number, number]
```

## Constructor details

_Overloads:_

```ts
new Color3(color)
```

- Parameters:
  - `color` (`IColor3 | Color3Tuple`): A tuple of [r, g, b], or an object with r, g and b properties.

```ts
new Color3(hex)
```

- Parameters:
  - `hex` (`string`): A color code in the form of a hexadecimal string.


```ts
new Color3(r, g, b)
```

- Parameters:
  - `r` (`number`): Red component.
  - `g` (`number`): Green component.
  - `b` (`number`): Blue component.

## Properties

### `r`

Red component.

- Type: `number`

### `g`

Green component.

- Type: `number`

### `b`

Blue component.

- Type: `number`
