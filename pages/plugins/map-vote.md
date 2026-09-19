# Map Vote

**Plugin ID:** `cn.hayashiume.mapvote`
**Config file:** `[Empostor.Plugins.MapVote]Config.json`

| Reference | Where |
| :--- | :--- |
| Configuration | [`Config.json`](#configuration) |
| Commands | [`#votemap`](#commands) |
| Admin Panel | None |
| HTTP API | None |

## Commands

| Command | Aliases | Usage | Permission |
| :--- | :--- | :--- | :--- |
| `#votemap <map>` | `#vm` | Cast or change your vote | Everyone |
| `#votemap start` | `#votemap public` | Open a voting session | Host |
| `#votemap end` | `#votemap close` | Close voting and apply the winner | Host |
| `#votemap enable` | — | Enable map voting | Host |
| `#votemap disable` | — | Disable map voting | Host |
| `#votemap results` | — | Show the current tally | Host |

```
#votemap polus
#vm fungle
```

**Accepted map names**

| Map | Aliases |
| :--- | :--- |
| Skeld | `skeld` |
| Mira HQ | `mira`, `mirahq` |
| Polus | `polus` |
| Airship | `airship` |
| Fungle | `fungle` |

## Voting Rules

- One active vote per player — the most recent vote replaces the previous one.
- Votes can be changed any time before voting is closed.
- The map with the most votes is applied when the next game starts.
- If no votes are cast, a random map is chosen.
- On a tie, one of the tied maps is chosen at random.

## Configuration

Edit `[Empostor.Plugins.MapVote]Config.json` next to the plugin DLL.

```json
{
  "enabled": true,
  "require_majority": false,
  "allow_host_override": true
}
```

| Field | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `enabled` | bool | `true` | Whether map voting is globally enabled. |
| `require_majority` | bool | `false` | Reserved — not currently enforced. |
| `allow_host_override` | bool | `true` | Allow the host to choose the map when no votes were cast. |

## Related

- [Commands](../reference/commands.md) — full list of in-game commands.
