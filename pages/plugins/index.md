# Plugins

Empostor ships 17 official plugins. They are distributed through the built-in [Plugin Marketplace](../server/plugin-marketplace.md) and can be installed from the [Admin Panel](../server/admin-panel.md) without stopping for a download — though the server must be restarted to load a newly installed `.dll`.

::: tip Building a plugin?
See [Writing a Plugin](../develop/writing-a-plugin.md) and the [Example Plugin](../develop/example-plugin.md).
:::

Player-facing chat commands provided by these plugins are listed in [Commands](../reference/commands.md).

## Installing

1. Open the admin panel at `http://your-server:22023/admin`.
2. Go to the **Plugin Marketplace** tab.
3. Press **Install** on the plugin you want.
4. Restart the server.

The marketplace reads its catalogue from the URL set in `Admin.MarketplaceUrl`. To host your own catalogue, see [Plugin Marketplace](../server/plugin-marketplace.md).

## Catalogue

Every plugin below matches an entry in `marketplace/plugins.json`.

### Communication

| Plugin | ID | Description |
| :--- | :--- | :--- |
| [Chat Manager](chat-manager.md) | `cn.hayashiume.chat` | Logs chat messages and enforces configurable message length limits. |
| [Chat Filter](chat-filter.md) | `cn.hayashiume.chatfilter` | Blocks configured words and rate-limits spam in game chat. |
| [Welcome Messages](welcome-messages.md) | `cn.hayashiume.welcome` | Sends a localised welcome message when players join a room. |
| [Custom Title](custom-title.md) | `cn.hayashiume.titles` | Shows a title prefix in front of a player's name. |

### Rooms & Gameplay

| Plugin | ID | Description |
| :--- | :--- | :--- |
| [Custom Game Codes](custom-game-codes.md) | `cn.hayashiume.code` | Draws room codes from word lists in the `Boot.Codes/` folder. |
| [Fixed Room Code](fixed-room-code.md) | `cn.hayashiume.fixedcode` | Always assigns a specific room code to a specific friend code. |
| [Map Vote](map-vote.md) | `cn.hayashiume.mapvote` | Lets players vote for the next map with chat commands. |

### Social

| Plugin | ID | Description |
| :--- | :--- | :--- |
| [Player Channel](player-channel.md) | `cn.hayashiume.playerchannel` | Cross-lobby chat channels addressed by friend code. |
| [Leave a Message](leave-a-message.md) | `cn.hayashiume.message` | Offline messages delivered when the recipient joins. |
| [Narrator (AI)](narrator.md) | `cn.hayashiume.narrator` | AI adviser available during meetings. |

### Identity & Verification

| Plugin | ID | Description |
| :--- | :--- | :--- |
| [Friend Code Validator](friend-code-validator.md) | `duck.hayashiume.friendcodevalidator` | Kicks clients whose friend code does not match the official format. |
| [QQ Verify](qq-verify.md) | `cn.hayashiume.qqverify` | Links in-game accounts to a QQ number for community management. |

### Ops & Data

| Plugin | ID | Description |
| :--- | :--- | :--- |
| [Monitor](monitor.md) | `gg.empostor.monitor` | HTTP endpoints for health checks and status dashboards. |
| [Player Log](player-log.md) | `gg.empostor.playerlog` | Records per-player activity and exposes it in the admin panel. |
| [Player Stats](player-stats.md) | `cn.hayashiume.playerstats` | Tracks wins, kills, tasks and more per player. |
| [Privacy Policy](privacy-policy.md) | `gg.empostor.privacy` | Serves a configurable privacy policy page and admin API. |

### Integrations

| Plugin | ID | Description |
| :--- | :--- | :--- |
| [Discord Webhook](discord-webhook.md) | `cn.hayashiume.discordwebhook` | Pushes game events into a Discord channel. |
