# Map Vote Plugin

::: tip Plugin
This feature is provided by the **Empostor.Plugins.MapVote** plugin (`cn.hayashiume.mapvote`). It must be installed and enabled for this to work.
:::

## Overview

The Map Vote plugin lets players vote for the next map during a game. When enabled, players use chat commands to cast their votes, and the map with the most votes is automatically selected when the next game starts.

## Commands

### `#votemap <map>` / `#vm <map>`

Cast or change your vote for a map.

**Supported maps:**

| Map | Aliases |
|---|---|
| Skeld | skeld |
| Mira HQ | mira, mirahq |
| Polus | polus |
| Airship | airship |
| Fungle | fungle |

Players can change their vote at any time before the game starts. The most recent vote replaces the previous one.

**Examples:**

```
#votemap polus
#vm fungle
```

### Host Commands

| Command | Description |
|---|---|
| `#votemap start` / `#votemap public` | Start a vote session (host only) |
| `#votemap end` / `#votemap close` | Close voting and announce the winner (host only) |
| `#votemap enable` | Enable map voting (host only) |
| `#votemap disable` | Disable map voting (host only) |
| `#votemap results` | Show the current vote tally |

## How It Works

1. When a game starts, if map voting is enabled, players can use `#votemap` to vote.
2. Votes are tracked per-player. Each player can only have one active vote.
3. When the host starts a new game (`#votemap end` or automatically), the map with the most votes is applied.
4. If no votes are cast, a random map is selected.
5. In case of a tie, a random winner is chosen among the tied maps.

## Configuration

The plugin loads its configuration from the path provided by the startup class.

```json
{
  "enabled": true,
  "require_majority": false,
  "allow_host_override": true
}
```

| Setting | Type | Default | Description |
|---|---|---|---|
| `enabled` | bool | `true` | Whether map voting is enabled globally |
| `require_majority` | bool | `false` | Whether a majority is required (not currently enforced) |
| `allow_host_override` | bool | `true` | Allow host to override when no votes are cast |

## Multi-Language Support

The plugin supports:
- English (`en`)
- Simplified Chinese (`zh_CN`)
- Traditional Chinese (`zh_TW`)
