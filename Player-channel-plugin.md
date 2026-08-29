# Player Channel Plugin

::: tip Plugin
This is a plugin feature provided by **Empostor.Plugins.PlayerChannel** (`cn.hayashiume.playerchannel`). It is not part of the core server.
:::

## Overview

The Player Channel plugin allows players in the same configured channel to communicate with each other across different games. It works like a cross-game chat system based on friend codes.

## Commands

### `#channel <message>`

Sends a message to all other players in your configured channel.

**Example:**

```
#channel Anyone up for a game on Polus?
```

**How it works:**

1. The server checks which channel the sender belongs to (based on their friend code)
2. The message is relayed to all other online players in the same channel
3. If the sender is not in any configured channel, they receive an error

## Configuration

Channels are defined in the plugin configuration:

```json
{
  "channels": [
    {
      "name": "friends",
      "friendCodes": ["FriendA#1234", "FriendB#5678", "FriendC#9012"]
    },
    {
      "name": "clan",
      "friendCodes": ["Leader#0001", "Member1#0002", "Member2#0003"]
    }
  ]
}
```

| Field | Description |
|---|---|
| `name` | Channel name (for logging) |
| `friendCodes` | List of friend codes that belong to this channel |

## Translations

The plugin includes translations for:
- English (`en`)
- Simplified Chinese (`zh_CN`)
- Traditional Chinese (`zh_TW`)
