# Statistics

When the [Player Stats](../plugins/player-stats.md) plugin is enabled, a **Statistics** tab appears in the admin panel showing per-player game data ranked by games played. Use **Refresh** to reload and **Reset All** to clear all stats (requires confirmation).

Players can also check their own stats in-game with `#stat` (aliases: `#stats`, `#mystats`). The response is sent privately and localized to the player's language.

## Configuration

Statistics are configured in the plugin's own config file, `[Empostor.Plugins.PlayerStats]Config.json` — not in `config.json`. See [Player Stats — Configuration](../plugins/player-stats.md#configuration) for the full field reference.

```json
{
  "Enabled": false,
  "PersistToFile": true
}
```

| Key | Default | Description |
| :--- | :--- | :--- |
| **Enabled** | `false` | Whether player statistics tracking is enabled. |
| **PersistToFile** | `true` | Save statistics to `Data/player_stats.json`. If `false`, stats are memory-only and lost on restart. |

## Tracked Metrics

| Stat | Description |
| :--- | :--- |
| Games Played | Total games participated in |
| Wins | Games won as crewmate |
| Losses | Games lost as crewmate |
| Impostor Wins | Games won as impostor |
| Kills | Total kills performed |
| Deaths | Total times killed |
| Tasks Completed | Total tasks completed |
| Times Exiled | Total times voted out |

## API Endpoints

| Method | Path | Description |
| :--- | :--- | :--- |
| `GET` | `/api/admin/player/stats` | Returns all player stats sorted by games played |
| `GET` | `/api/admin/player/stats/{friendCode}` | Returns stats for a single player |
| `POST` | `/api/admin/player/stats/reset` | Clears all player statistics (requires auth) |
