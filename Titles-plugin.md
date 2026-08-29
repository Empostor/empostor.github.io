# Title System Plugin

::: tip Plugin
This feature is provided by the **Empostor.Plugins.Titles** plugin (`cn.Empostor.titles`). It must be installed and enabled for this to work.
:::

## Overview

The Title System plugin assigns display title prefixes (e.g., `[Empostor]`) to specific players by friend code. When a player with a mapped friend code joins, their in-game name is changed to `[Title] Name`.

Titles are **one-time use**: after being applied, the mapping is removed from both the runtime store and the config file.

## How to Add Titles

Titles can be added via three methods:

### 1. Config File

Edit `[Title System]Config.json`:

```json
{
  "titles": [
    {
      "friendCode": "player#1234",
      "title": "Empostor"
    },
    {
      "friendCode": "helper#5678",
      "title": "Helper"
    }
  ]
}
```

### 2. Admin Panel

Use the JSON editor in the admin panel's Title System tab to add or edit title mappings.

### 3. HTTP API

```
POST /api/title/add
Content-Type: application/json

{
  "friendCode": "player#1234",
  "title": "Empostor",
  "addedBy": "admin"
}
```

No authentication is required for this endpoint.

## How It Works

1. When a player connects, the plugin looks up their friend code in the title mappings.
2. If found, the title is stored for application when the player spawns.
3. When the player spawns in the lobby, their display name is changed to `[Title] Name`.
4. The mapping is removed from the config and store (one-time use).

## Configuration

```json
{
  "titles": [
    {
      "friendCode": "aideproof#8388",
      "title": "Empostor"
    }
  ]
}
```

| Field | Type | Description |
|---|---|---|
| `friendCode` | string | Player's friend code |
| `title` | string | Title to display before their name |

## Admin Panel

The admin panel provides:
- Table view of current title mappings
- JSON editor to edit title configurations

## Multi-Language Support

The plugin supports:
- English (`en`)
- Simplified Chinese (`zh_CN`)
- Traditional Chinese (`zh_TW`)
