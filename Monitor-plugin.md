# Server Monitor Plugin

::: tip Plugin
This feature is provided by the **Empostor.Plugins.Monitor** plugin (`gg.empostor.monitor`). It must be installed and enabled for this to work.
:::

## Overview

The Server Monitor plugin provides HTTP API endpoints for monitoring server health and status. These endpoints are useful for external monitoring tools, load balancers, and custom dashboards.

## Endpoints

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
| `status` | string | Always `"running"` when server is healthy |
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
| `active_connections` | number | Total active connections |
| `games` | array | Active game details |

### `GET /api/monitor/health`

Simple health check for load balancers and monitoring tools.

**Response:**

```json
{
  "status": "healthy",
  "timestamp": "2026-05-23T12:00:00.0000000Z"
}
```

Returns HTTP 200 when the server is healthy.

## Configuration

This plugin requires no configuration.
