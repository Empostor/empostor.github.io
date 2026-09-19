# Player Stats

**Plugin ID:** `cn.hayashiume.playerstats`
**Config file:** `[Empostor.Plugins.PlayerStats]Config.json`

| Reference | Where |
| :--- | :--- |
| Configuration | [`Config.json`](#configuration) |
| Commands | [`#stat`](#commands) |
| Admin Panel | [Statistics tab](#admin-panel) |
| HTTP API | [Endpoints](#api) |

## Commands

| Command | Aliases | Usage | Permission |
| :--- | :--- | :--- | :--- |
| `#stat` | `#stats`, `#mystats` | `stat` | Everyone |

Returns the caller's own statistics as a private message. Requires `Enabled` to be `true`.

**Tracked metrics**

| Field | Description |
| :--- | :--- |
| Games Played | Total games participated in |
| Wins | Games won as crewmate |
| Losses | Games lost as crewmate |
| Impostor Wins | Games won as impostor |
| Kills | Total kills performed |
| Deaths | Total times killed |
| Tasks Completed | Total tasks completed |
| Times Exiled | Total times voted out |

## Configuration

Edit `[Empostor.Plugins.PlayerStats]Config.json` next to the plugin DLL. Created with defaults on first start.

```json
{
  "Enabled": false,
  "PersistToFile": true
}
```

| Field | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `Enabled` | bool | `false` | Whether statistics are recorded. When `false`, game events are ignored and nothing is tracked. |
| `PersistToFile` | bool | `true` | Write stats to `Data/player_stats.json`. When `false`, stats are memory-only and lost on restart. |

::: warning Statistics are off by default
Tracking stays off until `Enabled` is set to `true`. Players running `#stat` on a disabled server get a "not enabled" message.
:::

## Admin Panel

**Statistics** tab:

| Control | Action |
| :--- | :--- |
| Enable / Disable toggle | Turns recording on or off |
| Refresh | Reloads the table |
| Reset All Stats | Clears all player statistics (requires confirmation) |

Columns: Friend Code, Name, Games, Wins, Losses, Imp. Wins, Kills, Deaths, Tasks, Exiled — sorted by games played.

## API

| Method | Path | Description |
| :--- | :--- | :--- |
| `GET` | `/api/admin/player/stats` | All player stats, sorted by games played |
| `GET` | `/api/admin/player/stats/{friendCode}` | Stats for a single player |
| `POST` | `/api/admin/player/stats/reset` | Clear all statistics (requires auth) |

All endpoints sit under `/api/admin/` and return `401` without a valid session cookie.

## Storage

Persisted to `Data/player_stats.json` when `PersistToFile` is `true`, keyed by friend code.

## Related

- [Commands](../reference/commands.md) — full list of in-game commands.
- [Admin API](../reference/admin-api.md) — authentication and other admin endpoints.
