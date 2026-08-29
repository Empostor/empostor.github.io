# Detailed Features

Empostor ships with a rich set of built-in features beyond basic server hosting. This section covers all the advanced functionality available out of the box.

---

## Admin Panel

The **[Admin Panel](Admin-panel.md)** is a built-in web interface at `http://your-server:22023/admin`. It provides:

| Feature | Description |
|---|---|
| Dashboard | Live server stats: games, players, bans, uptime |
| Game Management | List active games, view players, end games |
| Client Management | View connected clients with mod details |
| Broadcast | Send messages to all active games |
| Kick / Ban | Remove or ban players by ID, IP, or friend code |
| Privacy Toggle | Switch games between public and private |
| Plugin Marketplace | Browse and install plugins from a marketplace URL |
| Update Check | Compare running version against latest GitHub release |
| Reports | View in-game player reports |
| Player Logs | Browse per-player activity logs |
| Statistics | Track per-player game statistics |
| Chat Filter | Configure blocked words and spam protection |
| Discord Webhook | Configure Discord notification webhooks |
| HPLP | Configure Starlight client discovery |
| Title System | Manage player title prefixes |

---

## Chat Filtering

**[Chat Filter](Admin-panel.md#chat-filter)** provides built-in moderation for in-game chat. Configure blocked words, toggle between blocking and logging, and set spam rate limits — all from the admin panel.

---

## Discord Webhook

**[Discord Webhook](Discord-webhook.md)** sends game events directly to a Discord channel. Notifications for game creation, player joins, reports, bans, and game endings.

---

## Player Statistics

**[Player Statistics](PlayerStats-plugin.md)** tracks per-player game data: wins, losses, impostor wins, kills, deaths, tasks completed, and more. Viewable in the admin panel and via `#stat` command.

---

## Server Monitoring

**[Server Monitor](Monitor-plugin.md)** provides HTTP API endpoints for health checks and status dashboards. Useful for external monitoring tools and load balancers.

---

## Privacy Policy

**[Privacy Policy](Privacy-plugin.md)** serves a configurable privacy policy page and provides an admin API to update it. Useful for servers that need to comply with privacy regulations.

---

## Map Vote

**[Map Vote](MapVote-plugin.md)** lets players vote for the next map during a game using chat commands. The map with the most votes is automatically selected.

---

## Narrator (AI Advisor)

**[Narrator](Narrator-plugin.md)** provides an AI-powered strategic advisor during meetings. Players can ask the AI for contextual advice based on their role, game state, and chat history.

---

## Title System

**[Title System](Titles-plugin.md)** assigns display title prefixes (e.g., `[Empostor]`) to specific players by friend code. Titles can be added via config, admin panel, or HTTP API.

---

## Welcome Messages

**[Welcome Messages](Welcome-plugin.md)** sends localized welcome messages to players when they join a lobby. Supports 16 languages, placeholders, remote URL content, and random message selection.

---

## Player Channel

**[Player Channel](Player-channel-plugin.md)** provides cross-game chat channels based on friend codes. Communicate with friends across different lobbies.

---

## Message System

**[Message System](Message-plugin.md)** lets players leave offline messages for each other by friend code. Messages are delivered when the recipient joins.

---

## QQ Verify

**[QQ Verify](QqVerify-plugin.md)** provides a QQ number verification system for linking in-game accounts to QQ accounts for community management.

---

## Friend Code Validator

**[Friend Code Validator](FriendCodeValidator-plugin.md)** validates player friend codes against a format pattern and a built-in dictionary of safe words.

---

## Plugin Marketplace

The **[Plugin Marketplace](Admin-panel.md#plugin-marketplace)** lets admins browse and install community plugins from the admin panel. Plugins are defined in a `plugins.json` file — see the [Configurable Files](configurable-files.md) reference for format details.
