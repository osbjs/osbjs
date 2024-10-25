# Vector2

A vector in 2d space.

A lot of methods can take in a `Vector2Tuple` or `IVector2` shape and turn it into a real `Vector2` under the hood.

```ts
interface IVector2 {
  x: number
  y: number
}

type Vector2Tuple = [number, number]
```

## Constructor details

_Overloads:_

```ts
new Vector2()
```

```ts
new Vector2(vector)
```

- Parameters:
  - `vector` (`IVector2 | Vector2Tuple`): A tuple of [x, y], or an object with x and y properties.

```ts
new Vector2(x, y)
```

- Parameters:
  - `x` (`number`): x value of the vector. Defaults to 0.
  - `y` (`number`): x value of the vector. Defaults to 0.

## Properties

### `x`

x value of the vector.

- Type: `number`

### `y`

y value of the vector.

- Type: `number`

## Methods

### `eq(v)`

Checks if this vector is equal to another vector.

- Parameters:

  - `v` (`Vector2`): The vector to compare with.

- Returns: `boolean`

### `add(v)`

Adds another vector to this vector.

- Parameters:

  - `v` (`Vector2`): The vector to add.

- Returns: `Vector2`

### `sub(v)`

Subtracts another vector from this vector.

- Parameters:

  - `v` (`Vector2`): The vector to substract.

- Returns: `Vector2`

### `mul(scalar)`

Multiplies this vector by a scalar.

- Parameters:

  - `scalar` (`number`): The scalar to multiply by.

- Returns: `Vector2`

### `div(scalar)`

Divides this vector by a scalar.

- Parameters:

  - `scalar` (`number`): The scalar to divide by.

- Returns: `Vector2`

### `dot(v)`

Calculates the dot product with another vector.

- Parameters:

  - `v` (`Vector2`): Another vector.

- Returns: `number`

### `len()`

Calculates the magnitude (length) of the vector.

- Returns: `number`

### `lenSqr()`

Gets the square of the length of this vector.

- Returns: `number`

### `normalize()`

Returns a normalized vector (a vector with unit length) of this vector.

- Returns: `Vector2`

### `dist(v)`

Calculates the distance between this vector and another vector.

- Parameters:

  - `v` (`Vector2`): The vector to calculate the distance to.

- Returns: `number`

### `angle(v)`

Calculates the angle between this vector and another vector in radians.

- Parameters:

  - `v` (`Vector2`): The vector to calculate the angle with.

- Returns: `number`

### `clone()`

Creates a copy of this vector.

- Returns: `Vector2`

### `negate()`

Returns a negated vector of this one (inverts its direction).

- Returns: `Vector2`

### `toString()`

Returns a string representation of the vector.

- Returns: `string`
