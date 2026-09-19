# Monitor

**Plugin ID:** `gg.empostor.monitor`
**Config file:** None — no configuration required

| Reference | Where |
| :--- | :--- |
| Configuration | None |
| Commands | None |
| Admin Panel | None |
| HTTP API | [Endpoints](#api) |

## API

### `GET /api/monitor/status`

Detailed server status for dashboards.

```json
{
  "status": "running",
  "timestamp": "2026-05-23T12:00:00.0000000Z",
  "uptime_seconds": 86400,
  "uptime_display": "1d 0h 0m",
  "version": "1.0.0",
  "runtime": ".NET 8.0.0",
  "platform": "Linux 5.15.0",
  "processors": 4,
  "memory_mb": 256,
  "game_count": 3,
  "player_count": 22,
  "active_connections": 30,
  "games": [
    {
      "code": "ABCDEF",
      "state": "Started",
      "map": "Skeld",
      "player_count": 10,
      "host": "PlayerName"
    }
  ]
}
```

| Field | Type | Description |
| :--- | :--- | :--- |
| `status` | string | Always `"running"` when the endpoint answers |
| `timestamp` | string | ISO 8601 UTC timestamp |
| `uptime_seconds` | number | Seconds since the server process started |
| `uptime_display` | string | Human-readable uptime |
| `version` | string | Server version |
| `runtime` | string | .NET runtime description |
| `platform` | string | OS description |
| `processors` | number | CPU core count |
| `memory_mb` | number | Working set memory in MB |
| `game_count` | number | Total active games |
| `player_count` | number | Players currently in games |
| `active_connections` | number | Total active connections |
| `games` | array | Per-game detail objects (see above) |

### `GET /api/monitor/health`

Lightweight probe for load balancers and uptime monitors. Returns HTTP `200` when healthy.

```json
{
  "status": "healthy",
  "timestamp": "2026-05-23T12:00:00.0000000Z"
}
```

::: tip Use `health` as the probe
`health` returns a two-field payload and is far cheaper than `status`. Poll it at high frequency and reserve `status` for dashboards.
:::

## Related

- [Player Log](player-log.md) — persistent per-player history rather than live snapshots.
- [Admin Panel](../server/admin-panel.md) — the built-in dashboard for the same data.
