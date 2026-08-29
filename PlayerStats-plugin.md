# Player Statistics Plugin

::: tip Plugin
This feature is provided by the **Empostor.Plugins.PlayerStats** plugin (`cn.hayashiume.playerstats`). It must be installed and enabled for this to work.
:::

## Overview

The Player Statistics plugin tracks persistent per-player game statistics across sessions. Stats are keyed by friend code and survive server restarts when file persistence is enabled.

## In-Game Command

### `#stat` (aliases: `#stats`, `#mystats`)

View your personal statistics. The response is sent as a private message.

**Tracked Metrics:**

| Stat | Description |
|---|---|
| Games Played | Total games participated in |
| Wins | Games won as crewmate |
| Losses | Games lost as crewmate |
| Impostor Wins | Games won as impostor |
| Kills | Total kills performed |
| Deaths | Total times killed |
| Tasks Completed | Total tasks completed |
| Times Exiled | Total times voted out |

## Configuration

Configuration is stored in `[Empostor.Plugins.PlayerStats]Config.json`:

```json
{
  "Enabled": false,
  "PersistToFile": true
}
```

| Setting | Type | Default | Description |
|---|---|---|---|
| `Enabled` | bool | `false` | Whether stat recording is active |
| `PersistToFile` | bool | `true` | Whether to persist stats to disk |

When disabled, events are ignored and no stats are recorded.

## Admin Panel

The statistics tab in the admin panel provides:

- **Enable/Disable** toggle for stat recording
- **Reset All Stats** button (danger action, requires confirmation)
- **Data table** showing per-player stats sorted by games played

Columns: Friend Code, Name, Games, Wins, Losses, Imp. Wins, Kills, Deaths, Tasks, Exiled

## API Endpoints

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/admin/player/stats` | Returns all player stats sorted by games played |
| `GET` | `/api/admin/player/stats/{friendCode}` | Returns stats for a single player |
| `POST` | `/api/admin/player/stats/reset` | Clears all player statistics (requires auth) |

## Storage

Stats are persisted to `Data/player_stats.json` when `PersistToFile` is `true`.
