# Discord Webhook Integration

Empostor can send game events to a Discord channel via [webhooks](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks). Each event is sent as a rich embed with relevant details.

Events are split into two categories, each with its own webhook URL:

- **Matchmaker** — game lifecycle events (Game Created, Game Started, Game Ended, Player Joined)
- **Admin** — moderation events (Player Banned, Player Reported)

This feature is **disabled by default**. Configure it via the **Admin Panel** (Discord tab) or by setting initial defaults in `config.json`.

> **Note**: Settings changed through the admin panel are persisted to `Data/DiscordWebhookData.json` and survive restarts. The `config.json` values are only used as fallback defaults on first launch.

## Configuration

Add the `DiscordWebhook` section to your `config.json` for initial defaults:

```json
{
  "DiscordWebhook": {
    "MatchmakerUrl": "",
    "AdminUrl": ""
  }
}
```

| Key | Default | Description |
| :--- | :--- | :--- |
| **MatchmakerUrl** | `""` | Discord webhook URL for matchmaker events (Game Created, Game Started, Game Ended, Player Joined). Leave empty to disable. |
| **AdminUrl** | `""` | Discord webhook URL for admin/moderation events (Player Banned, Player Reported). Leave empty to disable. |

> **Tip**: You can point both URLs to the same webhook if you want all events in one channel, or use different channels for matchmaker and admin notifications.

## Events

Each notification is sent as a Discord embed with a colored sidebar:

### Matchmaker Events

| Event | Embed Color | Fields |
| :--- | :--- | :--- |
| Game Created | Green | Game code, host name, host friend code |
| Game Started | Blurple | Game code, map, player count, impostor count |
| Player Joined | Green | Player name, friend code, game code, player count |
| Game Ended | Purple | Game code, result, player count |

### Admin Events

| Event | Embed Color | Fields |
| :--- | :--- | :--- |
| Player Banned | Red | Player name, friend code, game code |
| Player Reported | Yellow | Reporter, reported player, friend codes, game code, reason |

## Migration from v1

If you are upgrading from an older version that used a single `WebhookUrl` with per-event boolean toggles:

- The old `WebhookUrl` is automatically copied to both `MatchmakerUrl` and `AdminUrl` on first load.
- Old `Enabled` and `NotifyOn*` flags are ignored — just set the URLs you need.
- After the first save via the admin panel, the `discord_webhook.json` file uses the new format.

## Troubleshooting

- **No messages appear in Discord**: Verify the URL is correct and the webhook is active in your Discord channel. Check the server logs for `[Discord]` warnings.
- **Webhook returns HTTP errors**: Discord may rate-limit or the webhook URL may be invalid. The listener logs the HTTP status code on failure.
- **Events trigger but some fields are blank**: Friendly names and friend codes are read from client data — some fields may be empty (`—`) if the client hasn't fully connected yet.
