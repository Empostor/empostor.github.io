# HPLP (HTTP Public Lobby List Protocol)

Empostor can serve a public game list endpoint compatible with the [Starlight](https://github.com/All-Of-Us-Mods/starlight-releases) Android launcher. This allows Starlight clients to discover and join games hosted on your Empostor server through the Starlight "Lobbies" interface.

This feature is **disabled by default**. Enable it via the **Admin Panel** (HPLP tab) or set initial defaults in `config.json`.

> **Note**: Settings changed through the admin panel are persisted to `Data/HplpData.json` and survive restarts. The `config.json` values are only used as fallback defaults on first launch.

## Configuration

Add the `HPLP` section to your `config.json`:

```json
{
  "HPLP": {
    "Enabled": false,
    "RegionId": "default",
    "RegionName": "Empostor Server",
    "PublicUrl": ""
  }
}
```

| Key | Default | Description |
| :--- | :--- | :--- |
| **Enabled** | `false` | Whether the HPLP endpoint (`GET /x-api/games`) is enabled. |
| **RegionId** | `"default"` | Region identifier reported to Starlight clients. Use a short unique ID like `"meu"` or `"usw"`. |
| **RegionName** | `"Empostor Server"` | Human-readable region name displayed in the Starlight UI. |
| **PublicUrl** | `""` | Public URL that Starlight clients use to connect to this server. When empty, it is auto-generated as `http://{PublicIp}:{HttpPort}`. Set this to `https://your-domain.com` if running behind a reverse proxy with TLS. |

## Endpoint

```
GET /x-api/games
```

Returns a JSON array of active games and region metadata:

```json
{
  "games": [
    {
      "code": "QWERTY",
      "host_name": "PlayerName",
      "status": "Lobby",
      "player_count": 4,
      "max_players": 15,
      "chat_lang": 256,
      "map_id": 0,
      "region_id": "default",
      "mods": []
    }
  ],
  "regions": [
    {
      "id": "default",
      "name": "Empostor Server",
      "url": "http://your-server-ip:22023"
    }
  ]
}
```

### Status Values

| Empostor State | HPLP Status |
| :--- | :--- |
| `NotStarted`, `Starting` | `"Lobby"` |
| `Started` | `"Started"` |
| `Ended`, `Destroyed` | `"Ended"` |

### Mods

The `mods` array is populated from the host client's Reactor handshake mod list when available. Each entry contains:

| Field | Type | Description |
| :--- | :--- | :--- |
| **id** | `string` | Mod identifier (e.g. `"mira.api"`) |
| **version** | `string` | Mod version (e.g. `"0.3.6"`) |
| **flags** | `int` | `1` if the mod is required on all clients, `0` otherwise |

## Admin Panel

HPLP settings can also be managed from the admin panel under the **HPLP** tab. Changes take effect immediately and are persisted to `hplp.json`.

## Troubleshooting

- **Starlight clients don't see the server**: Verify `Enabled` is `true` and the `PublicUrl` (or auto-generated URL) is reachable from the client device.
- **Endpoint returns 503**: HPLP is not enabled. Set `"Enabled": true` in config or enable it via the admin panel.
- **Games don't appear**: Only active games (not destroyed) are listed. Create a game lobby first.
- **Mods array is empty**: This is expected if the host is not using Reactor mods or if Starlight uses a different mod protocol.
