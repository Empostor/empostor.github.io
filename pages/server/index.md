# Server Features

Everything below ships with Empostor itself — no plugins required. These are the capabilities you get once the server is running.

::: tip Looking for optional extras?
Optional functionality lives in [Plugins](../plugins/). If it can be disabled by removing a `.dll`, it is documented there.
:::

## Admin Panel

The **[Admin Panel](admin-panel.md)** is the built-in web interface at `http://your-server:22023/admin`. It is the primary tool for day-to-day operation:

| Capability | Covered on |
| :--- | :--- |
| Dashboard, games, clients, kick & ban | [Admin Panel](admin-panel.md) |
| Per-player game statistics | [Statistics](statistics.md) |
| Browse and install community plugins | [Plugin Marketplace](plugin-marketplace.md) |
| In-game reports | [Reports](admin-panel.md#reports) |
| Version check against GitHub releases | [Updates](admin-panel.md#updates) |

![Admin Panel](/images/overview_panel.png)

## Player & Server Data

| Feature | Description | Docs |
| :--- | :--- | :--- |
| Statistics | Per-player wins, kills, tasks and exiles, with `#stat` lookup in game. | [Statistics](statistics.md) |
| Reports | Last 200 in-game player reports with reason and outcome. | [Reports](admin-panel.md#reports) |
| Activity logs | Persistent, searchable per-player event history. | [Player Log](../plugins/player-log.md) |
| Health checks | HTTP endpoints for uptime monitoring. | [Monitor](../plugins/monitor.md) |

## Web Content

The server also serves plain HTTP content on port 22023:

- **[Hello Page](hello-page.md)** — a customisable page at `http://your-server:22023/`. An editable `Pages/index.html` is generated on first start.
- **Privacy Policy** — a configurable policy page, provided by the [Privacy Policy](../plugins/privacy-policy.md) plugin.

## Administration

- **Bans** — by IP or friend code, persisted to `bans.json`. See [Ban](admin-panel.md#ban).
- **Authentication** — password-protected admin session with HTTP-only cookies and rate limiting. See [Authentication](admin-panel.md#authentication).
- **Server updates** — compare your running version with the latest GitHub release. See [Updates](admin-panel.md#updates).

## Extending Further

Beyond what is built in, plugins are grouped as follows:

| Category | Examples |
| :--- | :--- |
| Chat & presentation | [Chat Manager](../plugins/chat-manager.md), [Chat Filter](../plugins/chat-filter.md), [Custom Title](../plugins/custom-title.md), [Welcome Messages](../plugins/welcome-messages.md) |
| Rooms & gameplay | [Custom Game Codes](../plugins/custom-game-codes.md), [Fixed Room Code](../plugins/fixed-room-code.md), [Map Vote](../plugins/map-vote.md) |
| Social | [Player Channel](../plugins/player-channel.md), [Leave a Message](../plugins/leave-a-message.md), [Narrator](../plugins/narrator.md) |
| Verification | [Friend Code Validator](../plugins/friend-code-validator.md), [QQ Verify](../plugins/qq-verify.md) |
| Ops & data | [Monitor](../plugins/monitor.md), [Player Log](../plugins/player-log.md), [Player Stats](../plugins/player-stats.md), [Privacy Policy](../plugins/privacy-policy.md) |
| Integrations | [Discord Webhook](../plugins/discord-webhook.md) |

See the full [Plugin Catalogue](../plugins/).
