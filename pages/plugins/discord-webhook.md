# Discord Webhook

**Plugin ID:** `cn.hayashiume.discordwebhook`
**Config file:** `discord_webhook.json` (managed via admin panel)

| Reference | Where |
| :--- | :--- |
| Configuration | [Config](#configuration) |
| Commands | None |
| Admin Panel | [Discord tab](#admin-panel) |
| HTTP API | None |

Forwards server events to Discord as rich embeds. Two independent webhook URLs, one per event category. Disabled while both URLs are empty.

## Configuration

| Category | Events |
| :--- | :--- |
| **Matchmaker** | Game Created, Game Started, Game Ended, Game Destroyed |
| **Admin** | Player Banned, Player Reported |

Set initial defaults in `config.json`:

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
| `MatchmakerUrl` | `""` | Webhook URL for matchmaker events. Empty disables them. |
| `AdminUrl` | `""` | Webhook URL for moderation events. Empty disables them. |

::: tip Precedence
`config.json` values are fallback defaults used only on first launch. Once saved through the admin panel, the active settings live in `Data/DiscordWebhookData.json` and **override** `config.json`. Subsequent edits to `config.json` are ignored.
:::

Point both URLs at the same webhook to route everything into one channel, or use separate channels for the two categories.

## Admin Panel

**Discord** tab — edit both URLs here. Changes are persisted immediately; no restart required.

## Events

### Matchmaker

| Event | Embed colour | Fields |
| :--- | :--- | :--- |
| Game Created | Green | Game code, host name, host friend code, map, player count, impostor count, note |
| Game Started | Blurple | Game code, map, player count, impostor count |
| Game Ended | Purple | Game code, result, player count |
| Game Destroyed | Grey | Game code |

### Admin

| Event | Embed colour | Fields |
| :--- | :--- | :--- |
| Player Banned | Red | Player name, friend code, game code |
| Player Reported | Yellow | Reporter, reported player, friend codes, game code, reason |

## Migration from v1

Older versions used a single `WebhookUrl` with per-event boolean toggles.

- On first load, the old `WebhookUrl` is copied into both `MatchmakerUrl` and `AdminUrl`.
- Legacy `Enabled` and `NotifyOn*` flags are ignored — set the URLs you want.
- After the first admin-panel save, `discord_webhook.json` uses the new format.

## Troubleshooting

| Symptom | Check |
| :--- | :--- |
| No messages arrive | URL correctness, webhook still active in the channel, `[Discord]` warnings in the server log |
| HTTP errors | Discord rate limiting or an invalid URL; the status code is logged on failure |
| Some fields blank | Names and friend codes come from client data and may be `—` if the client had not fully connected |
