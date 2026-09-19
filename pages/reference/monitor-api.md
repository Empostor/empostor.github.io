# Server Monitoring API

## Endpoints

The server exposes two public monitoring endpoints that do not require authentication.

### `GET /api/monitor/status`

Returns detailed server status including uptime, resource usage, and active games.

**Response:**

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
|---|---|---|
| `status` | string | Always `"running"` when the server is up |
| `timestamp` | string | ISO 8601 UTC timestamp |
| `uptime_seconds` | number | Seconds since server process started |
| `uptime_display` | string | Human-readable uptime |
| `version` | string | Server version |
| `runtime` | string | .NET runtime description |
| `platform` | string | OS description |
| `processors` | number | CPU core count |
| `memory_mb` | number | Working set memory in MB |
| `game_count` | number | Total active games |
| `player_count` | number | Players currently in games |
| `active_connections` | number | Total connected clients |
| `games` | array | List of active games with details |

### `GET /api/monitor/health`

Simple health check endpoint for load balancers and monitoring tools.

**Response:**

```json
{
  "status": "healthy",
  "timestamp": "2026-05-23T12:00:00.0000000Z"
}
```

Returns HTTP 200 when the server is healthy.

## Usage Examples

### Prometheus / Uptime Kuma

Point your monitoring tool to `http://your-server:22023/api/monitor/health` for health checks.

### Custom Dashboard

Use `/api/monitor/status` to build a custom server dashboard:

```bash
curl http://localhost:22023/api/monitor/status | jq .
```

### Status Page

Embed server status on an external website by fetching and caching the status endpoint periodically.
