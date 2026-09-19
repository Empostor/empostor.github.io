# Chat Manager

**Plugin ID:** `cn.hayashiume.chat`
**Config file:** `boot_chat.json`

| Reference | Where |
| :--- | :--- |
| Configuration | [`boot_chat.json`](#configuration) |
| Commands | None — no chat commands |
| Admin Panel | None — edit the config file |
| HTTP API | None |

Enforces per-sender chat message length limits and logs chat traffic.

## Configuration

Edit `boot_chat.json` next to the `Empostor.Server` executable. The file is created on first start.

```json
{
  "playerMaxMessageLength": 300,
  "hostMaxMessageLength": 1200,
  "tooLongMessage": "[SERVER] Couldn't send your message, it was too long."
}
```

| Field | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `playerMaxMessageLength` | int | `300` | Maximum characters per message for regular players. |
| `hostMaxMessageLength` | int | `1200` | Maximum characters per message for the game host. |
| `tooLongMessage` | string | `"[SERVER] Couldn't send your message, it was too long."` | Reply sent privately to the sender when the limit is exceeded. |

::: warning Limits are not retroactive
Changing the limits requires a server restart; in-flight messages are unaffected.
:::

## Related

- [Chat Filter](chat-filter.md) — blocked words and spam rate limiting. Both plugins can run at the same time, they cover different concerns.
- [Commands](../reference/commands.md) — full list of in-game commands.
