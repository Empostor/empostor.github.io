# Fixed Room Code

Pin a permanent room code to a specific player, so that whenever they host a game the room always gets the same code.

**Plugin ID:** `cn.hayashiume.fixedcode` · **Config file:** `[Fixed Room Code]Config.json`

| Reference | Where |
| :--- | :--- |
| Configuration | [`Config.json`](#configuration) |
| Commands | None |
| Admin Panel | None |
| HTTP API | None |

## How It Works

The plugin listens to `IGameCreationEvent`. When a game is created, it looks up the host's friend code:

- If the friend code matches a mapping, the room code is overwritten with the configured code.
- If there is no match, the server assigns a code as usual.

Lookups are **case-insensitive**, so `KAMI#1337` and `kami#1337` are treated as the same player.

## Configuration

Edit `[Fixed Room Code]Config.json` next to the server executable:

```json
{
  "mappings": [
    {
      "friendCode": "kami#1337",
      "roomCode": "DUCK"
    },
    {
      "friendCode": "rose#0123",
      "roomCode": "GARDEN"
    }
  ]
}
```

The top-level key is `mappings`, holding a list of objects with these fields:

| Field | Type | Description |
| :--- | :--- | :--- |
| `friendCode` | string | Friend code of the host that should receive the fixed code. |
| `roomCode` | string | Room code to assign. Must be 4 or 6 letters. |

## Rules & Validation

A mapping is only applied if it passes every check below. Entries that fail are **skipped with a warning in the server log**, and the rest of the mappings keep working.

| Check | Requirement |
| :--- | :--- |
| Non-empty | Neither `friendCode` nor `roomCode` may be blank. |
| Length | The room code must be exactly **4 or 6** characters. |
| Letters only | Non-letter characters are rejected. |
| Valid game code | The code must be convertible to a valid `GameCode`. |

Because of this, `ROSE` and `GARDEN` are valid, while `AB` (too short), `ABCDE` (wrong length) and `C0DE` (contains a digit) are ignored.

::: tip Check the startup log
On enable the plugin logs `[FixedCode] Plugin enabled. N mapping(s) loaded.` — compare that number with how many entries you wrote. Anything silently skipped also logs a `[FixedCode]` warning line above it.
:::

## Verifying

1. Add a mapping for your own friend code.
2. Restart the server.
3. Host a game. The room code shown in the admin panel should match your configured value.

## Related

- [Custom Game Codes](custom-game-codes.md) — draw random codes from word lists instead of pinning them.
- [Friend Code Validator](friend-code-validator.md) — reject clients with malformed friend codes, which would otherwise never match a mapping.
