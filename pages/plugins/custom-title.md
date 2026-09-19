# Custom Title

**Plugin ID:** `cn.Empostor.titles`
**Config file:** `[Title System]Config.json`

| Reference | Where |
| :--- | :--- |
| Configuration | [`[Title System]Config.json`](#configuration) |
| Commands | None — titles are assigned from config, panel or API |
| Admin Panel | [Title System tab](#admin-panel) |
| HTTP API | [`POST /api/title/add`](#api) |

Prefixes a player's display name with a title, keyed by friend code: `[Empostor] <name>`.

::: warning Titles are one-time use
Once a title is applied, its mapping is removed from both the runtime store and the config file. Re-granting a title requires adding the mapping again.
:::

## Configuration

Edit `[Title System]Config.json` next to the plugin DLL.

```json
{
  "titles": [
    {
      "friendCode": "aideproof#8388",
      "title": "Empostor"
    }
  ]
}
```

| Field | Type | Description |
| :--- | :--- | :--- |
| `friendCode` | string | Player's friend code. Matched case-insensitively. |
| `title` | string | Text shown before the player's name. |

**Applied on connection** — the plugin looks up the friend code on connect, stores the title, and applies it when the player spawns in the lobby. Afterwards the mapping is consumed.

## Admin Panel

**Title System** tab: table view of current mappings, plus a JSON editor to add or edit them directly.

## API

```
POST /api/title/add
Content-Type: application/json

{
  "friendCode": "player#1234",
  "title": "Empostor",
  "addedBy": "admin"
}
```

::: danger No authentication
This endpoint is **not** authenticated. Anyone who can reach the server port can grant arbitrary titles. Do not expose it publicly.
:::

## Related

- [Welcome Messages](welcome-messages.md) — also alters what players see on join.
- [Commands](../reference/commands.md) — full list of in-game commands.
