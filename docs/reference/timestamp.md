# Timestamp

Represent osu timestamp in the format `mm:ss:msmsms`.

Example:

```ts
const startTime = new Timestamp('00:10:023')
```

## Constructor details

```ts
new Timestamp(input)
```

- Parameters:
  - input (`string | number`): A string in the format `mm:ss:msmsms` or milliseconds in number.

## Methods

### `toMilliseconds()`

Returns a number equals to the total milliseconds.

- Returns: `number`

### `toString()`

Returns the string representation in the format `mm:ss:msmsms`.

- Returns: `string`
