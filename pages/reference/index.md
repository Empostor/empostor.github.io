# API Reference

Empostor exposes several HTTP APIs for monitoring, integration, and client matchmaking. In-game chat commands are documented separately in [Commands](commands.md).

---

## Server Monitoring API

**[Server Monitoring](monitor-api.md)** provides two public endpoints for health checks and status dashboards:

### `GET /api/monitor/status`

Returns detailed server status including uptime, resource usage, and active games.

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

### `GET /api/monitor/health`

Simple health check for load balancers and monitoring tools (Prometheus, Uptime Kuma).

```json
{ "status": "healthy", "timestamp": "2026-05-23T12:00:00.0000000Z" }
```

Returns HTTP 200 when the server is healthy.

---

## Privacy Policy API

**[Privacy Policy API](privacy-api.md)** lets server admins publish a custom privacy policy:

| Endpoint | Method | Auth | Description |
|---|---|---|---|
| `/privacy` | GET | None | Serves the privacy policy HTML page |
| `/admin/api/privacy` | POST | Admin token | Updates the privacy policy content |

The privacy policy HTML is stored in `Pages/privacy.html` and persists across restarts. A default template is created if the file doesn't exist, covering data collection, usage, sharing, retention, and contact information.

Authentication uses the `EMP_HTTP_TOKEN` or `EMP_ADMIN_TOKEN` environment variables, falling back to `"empostor"` if neither is set.

---

## Game Listing API

**[Game Listing API](game-listing-api.md)** handles Among Us client matchmaking, following the Innersloth protocol:

| Endpoint | Method | Description |
|---|---|---|
| `/api/games` | GET | Legacy game listing (pre-v16.0.0 clients), filterable by map, language, impostors |
| `/api/games` | POST | Legacy: get server address for a specific game |
| `/api/games` | PUT | Legacy: get server address for hosting a new game |
| `/api/games/{gameId}` | GET | Get details for a specific game by integer code |
| `/api/games/filtered` | GET | Modern lobby list (v16.0.0+), returns all public games with metadata |
| `/api/games/publicgames` | GET | JSON summary of all active games for admin dashboards and external tooling |

Game codes use two formats: 6-letter string (`ABCDEF`) and internal integer representation. The `GameCode` type transparently converts between them.

### Public Games Response

The `/api/games/publicgames` endpoint returns a clean JSON summary:

```json
{
  "totalGames": 3,
  "totalPlayers": 22,
  "games": [
    {
      "code": "ABCDEF",
      "codeInt": 1234567890,
      "state": "Started",
      "isPublic": true,
      "playerCount": 10,
      "maxPlayers": 15,
      "map": "Skeld",
      "impostors": 2,
      "host": "HostName",
      "hostFriendCode": "Name#1234",
      "players": [
        {
          "name": "PlayerOne",
          "friendCode": "Name#5678",
          "isHost": false,
          "platform": "Steam"
        }
      ]
    }
  ]
}
```

---

---

## Verification API


Endpoints used by verification plugins such as QQ Verify. See [Verification API](verification-api.md).

---

## Admin API


Internal endpoints powering the admin panel (require session authentication). See [Admin API](admin-api.md).

---
