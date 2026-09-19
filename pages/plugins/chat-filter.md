# Chat Filter

**Plugin ID:** `cn.hayashiume.chatfilter`
**Config file:** `[Empostor.Plugins.ChatFilter]Config.json`

| Reference | Where |
| :--- | :--- |
| Configuration | [`Config.json`](#configuration) |
| Commands | None |
| Admin Panel | [Chat Filter tab](#admin-panel) |
| HTTP API | None |

Blocks words and rate-limits spam in game chat. Two independent filters — a message can be caught by either.

## Configuration

Edit `[Empostor.Plugins.ChatFilter]Config.json` in the server working directory. Fields are flat (no wrapper object).

```json
{
  "Enabled": false,
  "BlockedWords": [],
  "BlockMessage": true,
  "SpamThreshold": 5,
  "SpamWindowSeconds": 10
}
```

| Field | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `Enabled` | bool | `false` | Master switch for both filters. |
| `BlockedWords` | string[] | `[]` | Blocked words. Case-insensitive **substring** match — `"bad"` also blocks `"badword"`. |
| `BlockMessage` | bool | `true` | `true` cancels the message; `false` lets it through and only logs a warning. |
| `SpamThreshold` | int | `5` | Messages allowed inside the window before rate limiting kicks in. |
| `SpamWindowSeconds` | int | `10` | Sliding window length in seconds. |

::: warning Substring matching
Short words like `"ass"` match `"pass"` and `"classic"`. Use specific, longer words to avoid false positives.
:::

## Filter Rules

| Filter | Trigger | Action |
| :--- | :--- | :--- |
| Word filter | Message contains any `BlockedWords` entry | Handled per `BlockMessage` |
| Spam filter | `SpamThreshold` or more messages within `SpamWindowSeconds` | Handled per `BlockMessage` |

## Example

Block two words and allow at most 3 messages per 5 seconds:

```json
{
  "Enabled": true,
  "BlockedWords": ["badword1", "badword2"],
  "BlockMessage": true,
  "SpamThreshold": 3,
  "SpamWindowSeconds": 5
}
```

## Admin Panel

**Chat Filter** tab — manage at runtime without restarting or editing files:

| Control | Effect |
| :--- | :--- |
| Enable/disable checkbox | Toggles filtering |
| Word list editor | Adds or removes blocked words |
| Threshold & window fields | Spam rate-limit tuning |
| Block / log toggle | Sets `BlockMessage` behaviour |

::: warning Panel changes are runtime-only
Settings changed in the panel take effect immediately but are **not** written back to the config file. Persist your choices in `[Empostor.Plugins.ChatFilter]Config.json` yourself.
:::

## Related

- [Chat Manager](chat-manager.md) — message length limits; complements this plugin.
- [Commands](../reference/commands.md) — full list of in-game commands.
