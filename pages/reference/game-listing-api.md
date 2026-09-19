# Game Listing API

## Overview

These endpoints handle Among Us game listing and matchmaking. They follow the Innersloth API protocol for client-server communication.

## Endpoints

### `GET /api/games`

Legacy game listing endpoint for Among Us clients older than v16.0.0.

**Query Parameters:**

| Parameter | Type | Description |
|---|---|---|
| `mapId` | int | Filter by map type |
| `lang` | int | Filter by language (GameKeywords enum) |
| `numImpostors` | int | Filter by impostor count |

**Headers:**

| Header | Description |
|---|---|
| `Authorization: Bearer <base64-token>` | Client authentication token |

### `POST /api/games`

Legacy: get the server address hosting a specific game.

**Request Body:** `gameId` (int)

Returns the IP and port of the server hosting the game, or a `GameNotFound` error.

### `PUT /api/games`

Legacy: get the server address for hosting a new game. Returns the current server's public IP and port.

### `GET /api/games/{gameId}`

Get details for a specific game by its integer code.

### `GET /api/games/filtered`

Modern lobby list endpoint (Among Us 16.0.0+). Returns all public games.

**Response:**

```json
{
  "games": [
    {
      "IP": 123456789,
      "Port": 22023,
      "GameId": 1234567890,
      "PlayerCount": 8,
      "HostName": "HostPlayer",
      "TrueHostName": "HostPlayer",
      "HostPlatformName": "Steam",
      "Platform": 1,
      "QuickChat": 0,
      "Age": 0,
      "MaxPlayers": 15,
      "NumImpostors": 2,
      "MapId": 0,
      "Language": 0,
      "Options": "..."
    }
  ],
  "metadata": {
    "allGamesCount": 5,
    "matchingGamesCount": 3
  }
}
```

### `GET /api/games/publicgames`

JSON summary of all active games, designed for admin dashboards and external tooling.

**Response:**

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

## Game Code Format

Game codes in the API use two formats:
- **String format** (e.g., `ABCDEF`): 6 uppercase letters, used in the admin panel
- **Integer format** (e.g., `1234567890`): Internal integer representation, used in client protocol

The `GameCode` type transparently converts between these formats.
