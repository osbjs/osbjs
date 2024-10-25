# Sample

Represents an audio sample in the storyboard.

Example:

```ts
const sampl = new Sample({
  time: 1000,
  layer: 0,
  path: 'sample.ogg',
  volume: 100,
})
```

## Constructor details

```ts
new Sample({
  time,
  layer,
  path,
  volume = 100,
})
```

- Parameters:

  - `time` (`number | string | Timestamp`) ([Timestamp](./timestamp.md)): The time at which the sample is played.
  - `layer` (`SampleLayer`) ([SampleLayer](./samplelayer)): The layer on which the sample is played.
  - `path` (`string`): The file path of the sample relative to the beatmap folder.
  - `volume` (`number`): The volume of the sample. Defaults to `100`.

## Properties

### `time`

The time at which the sample is played.

- Type: `Timestamp`

### `layer`

The layer on which the sample is played

- Type: `SampleLayer` ([SampleLayer](./samplelayer))

### `path`

The file path of the sample relative to the beatmap folder.

- Type: `string`

### `volume`

The volume of the sample.

- Type: `number`

## Methods

### `toString()`

Return a string representation of this sample.

- Returns: `string`
