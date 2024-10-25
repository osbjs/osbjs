# Trigger

::: info
Inherits: [CompoundCommand](./compoundcommand)
:::

A command group that will trigger when a specific condition is satisfied.

Example:

```ts
const trigger = new Trigger({
  triggerType: 'Passing',
  startTime: 0,
  endTime: 1000,
})
trigger.commands.push(
  new Fade({
    startTime: 0,
    startValue: 1,
  }),
)
```

## Constructor details

```ts
new Trigger({
  triggerType,
  startTime,
  endTime,
  commands,
})
```

- Parameters:
  - `startTime` (`number | string | Timestamp`) ([Timestamp](./timestamp)): The start time of the trigger group.
  - `endTime` (`number | string | Timestamp`) ([Timestamp](./timestamp)): The end time of the trigger group.
  - `triggerType` (`TriggerType`) ([TriggerType](./triggertype)): The condition to trigger this group.
  - `commands` (`Command[] | undefined`) ([TriggerType](./triggertype)): List of child commands that will be triggered. Defaults to `undefined`.

## Properties

_Properties inherited from [Command](./command):_

[`startTime`](./command#startTime)

_Properties inherited from [CompoundCommand](./compoundcommand):_

[`commands`](./compoundcommand#commands)

### `triggerType`

The condition to trigger this group.

- Type: `TriggerType` ([TriggerType](./triggertype))

### `endTime`

The end time of the trigger group.

- Type: `Timestamp` ([Timestamp](./timestamp.md))
