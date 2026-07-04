# Firewall & Dynamic Ports

## Overview

Empostor uses **dynamic delta ports** for authentication. When a player connects, the server allocates a temporary UDP port just for that player's auth handshake. After authentication succeeds, the player is switched to the main game port.

## Dynamic Delta Ports

The delta port mechanism works as follows:

1. Client sends a token request to `POST /api/user` over HTTP
2. Server allocates a random UDP port from the configured port pool
3. Server starts a temporary UDP listener on that port
4. Client connects to the delta port to complete the UDP handshake
5. Server matches the connection to the token by port number
6. After successful auth, the delta listener is stopped and the port is returned to the pool

### Configuration

```json
{
  "PortPool": {
    "Start": 22024,
    "End": 22124
  }
}
```

This reserves ports 22024-22124 for delta authentication. The pool size determines how many simultaneous connections can be authenticated at once.

## Firewall Configuration

### Linux (ufw)

If your server runs on Linux, Empostor can automatically manage firewall rules:

```json
{
  "ServerConfig": {
    "UseUfw": true
  }
}
```

When enabled, Empostor runs `ufw allow <port>/udp` for each delta port, and `ufw delete allow <port>/udp` when the port is returned.

**Requirements:**
- `ufw` must be installed and the Empostor process must have `sudo` access to run `ufw` commands
- If running in Docker, ensure the container has the `NET_ADMIN` capability

### Linux (firewalld)

```json
{
  "ServerConfig": {
    "UseFirewalld": true
  }
}
```

Similar to ufw but uses `firewall-cmd --add-port=<port>/udp` and `--remove-port`.

### Windows / Docker without firewall

On Windows or when running in Docker without network admin, set both to `false`:

```json
{
  "ServerConfig": {
    "UseUfw": false,
    "UseFirewalld": false
  }
}
```

In this case, you must manually ensure the port range is open (or disable the host firewall for testing). Empostor will log a warning but continue operating.

### Main Game Ports

The main game port is configured separately:

```json
{
  "Server": {
    "ListenIp": "0.0.0.0",
    "ListenPort": 22023
  }
}
```

This is the port all game traffic uses after authentication. Only this port + the HTTP server port need to be permanently open.

## IP Geolocation

When a player connects, Empostor queries [ip-api.com](http://ip-api.com) to resolve the player's IP to a human-readable location (country, region, city). This is displayed:

- In server logs on player join
- In the admin panel client detail modal

Results are cached for 24 hours. Private/reserved IPs (127.x, 10.x, 192.168.x, 172.16-31.x) are skipped and never queried.

No API key is required. The free tier allows 45 requests per minute.
