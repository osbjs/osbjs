# Loop

::: info
Inherits: [CompoundCommand](./compoundcommand)
:::

A command group that will repeat itself a fixed number of times.

Example:

```ts
const loop = new Loop({
  startTime: 0,
  loopCount: 10,
})
loop.commands.push(
  new Fade({
    startTime: 0,
    startValue: 1,
  }),
)
```

## Constructor details

```ts
new Loop({ startTime, loopCount, command })
```

- Parameters:
  - `startTime` (`number | string | Timestamp`) ([Timestamp](./timestamp)): The start time of the loop group.
  - `triggerType` (`TriggerType`) ([TriggerType](./triggertype)): The condition to trigger this group.
  - `commands` (`Command[] | undefined`) ([TriggerType](./triggertype)): List of child commands that will repeat. Defaults to `undefined`.


## Properties

_Properties inherited from [Command](./command):_

[`startTime`](./command#startTime)

_Properties inherited from [CompoundCommand](./compoundcommand):_

[`commands`](./compoundcommand#commands)

### `loopCount`

The number of times to loop.

- Type: `number`
