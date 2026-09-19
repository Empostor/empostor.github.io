# Commands

In-game commands are typed into chat with a `#` prefix. `#help` lists everything available on the current server — plugin commands only appear if their plugin is installed and enabled.

| Category | Commands |
| :--- | :--- |
| [Built-in](#built-in-commands) | 9 commands, always available |
| [Plugin](#plugin-commands) | 6 commands, depend on installed plugins |

## Built-in Commands

Shipped with the server, no plugins required.

### Everyone

| Command | Aliases | Usage | Description |
| :--- | :--- | :--- | :--- |
| `#help` | — | `help [command]` | Show available commands, or details for one command. |
| `#ping` | — | `ping` | Show your current latency. |
| `#players` | — | `players` | List players in the current game with their ping. Lobby only. |
| `#setcolor` | `#sc`, `#color` | `setcolor [0-17]` | Change your player color. Valid range 0–17. |
| `#stat` | `#stats`, `#mystats` | `stat` | Show your own game statistics. Requires the [Player Stats](../plugins/player-stats.md) plugin to be enabled. |

### Host Only

| Command | Aliases | Usage | Description |
| :--- | :--- | :--- | :--- |
| `#note` | — | `note [text \| clear]` | Set or clear a note on the game room. |
| `#max` | — | `max [1-127]` | Set the maximum number of players. Valid range 1–127. |
| `#kick` | — | `kick <player> [reason]` | Kick a player by friend code or name. |
| `#ban` | — | `ban <player> [reason]` | Ban a player by friend code or name. |
| `#end` | — | `end [reason]` | End the current game. |

::: warning `#max` requires a client mod above 15
Values above 15 only work if all players run CrowdedMod or another mod that supports crowded lobbies. The server warns about this when you set a higher value.
:::

## Plugin Commands

Provided by official plugins; absent unless the plugin is installed.

| Command | Aliases | Usage | Plugin | Permission |
| :--- | :--- | :--- | :--- | :--- |
| `#narrator <question>` | `#nar`, `#n` | Ask the AI for meeting advice | [Narrator](../plugins/narrator.md) | Everyone |
| `#votemap <map>` | `#vm` | Vote for the next map | [Map Vote](../plugins/map-vote.md) | Everyone |
| `#msg <friendcode> <message>` | `#message`, `#leave` | Leave an offline message | [Leave a Message](../plugins/leave-a-message.md) | Everyone |
| `#channel <message>` | — | Send to your player channel | [Player Channel](../plugins/player-channel.md) | Everyone |
| `#stat` | `#stats`, `#mystats` | Show your statistics | [Player Stats](../plugins/player-stats.md) | Everyone |
| `#verify <QQ号>` | `#ver` | Start QQ verification | [QQ Verify](../plugins/qq-verify.md) | Everyone |

Some plugins also expose host-only subcommands — for example `#votemap start` / `#votemap end` and `#narrator enable` / `#narrator limit`. See each plugin page for the full list.

## Aliases

Aliases are alternate names for the same command. Typing `#sc 3`, `#color 3` and `#setcolor 3` is equivalent. `#help` shows the aliases of each command.

## Related

- [Writing a Plugin](../develop/writing-a-plugin.md) — implement your own command via `ICommand`.
- [Admin Panel](../server/admin-panel.md) — moderation without chat commands.
