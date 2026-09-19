# Leave a Message

**Plugin ID:** `cn.hayashiume.message`
**Config file:** `[Empostor.Plugins.Message]Config.json`

| Reference | Where |
| :--- | :--- |
| Configuration | [`Config.json`](#configuration) |
| Commands | [`#msg`](#commands) |
| Admin Panel | None |
| HTTP API | None |

## Commands

| Command | Aliases | Usage | Permission |
| :--- | :--- | :--- | :--- |
| `#msg` | `#message`, `#leave` | `msg <friendcode> <message>` | Everyone |

```
#msg Name#1234 Hey, let's play again tomorrow!
#msg Friend#5678 GG, that was a fun game
```

**Constraints**

| Constraint | Limit |
| :--- | :--- |
| Friend code length | Minimum 4 characters |
| Message length | Maximum `message_max_length` characters |
| Pending messages per recipient | Maximum `max_messages_per_target` |
| Self-messaging | Rejected |

## Configuration

Edit `[Empostor.Plugins.Message]Config.json` next to the plugin DLL. The file is created with defaults on first start.

```json
{
  "max_messages_per_target": 10,
  "message_max_length": 500
}
```

| Field | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `max_messages_per_target` | int | `10` | Maximum undelivered messages queued per recipient. |
| `message_max_length` | int | `500` | Maximum characters per message. |

::: tip Where is this file?
Plugin config files live next to the plugin DLL and are named `[<plugin name>]Config.json`. See [Configurable Files](../config-files/) for the full convention.
:::

## Storage

Pending messages are persisted in JSON. Entries are removed once delivered.

```json
{
  "Name#1234": [
    {
      "id": "abc123...",
      "sender_name": "PlayerA",
      "sender_fc": "PlayerA#5678",
      "target_fc": "Name#1234",
      "content": "Hello!",
      "timestamp": "2026-05-23T06:30:00Z"
    }
  ]
}
```

Delivery happens when the recipient spawns in any game; queued messages arrive as private chat, newest last:

```
--- You have 2 pending message(s) ---
[05-23 14:30] <SenderName> Hello!
[05-22 09:15] <OtherPlayer> Good game yesterday!
```

## Related

- [Commands](../reference/commands.md) — full list of in-game commands.
