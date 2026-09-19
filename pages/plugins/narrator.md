# Narrator (AI)

**Plugin ID:** `cn.hayashiume.narrator`
**Config file:** `[Empostor.Plugin.Narrator]Config.json`

| Reference | Where |
| :--- | :--- |
| Configuration | [`Config.json`](#configuration) |
| Commands | [`#narrator`](#commands) |
| Admin Panel | [Narrator tab](#admin-panel) |
| HTTP API | None |

::: warning Third-party API
Responses come from the DeepSeek AI API. You supply your own API key and are responsible for its usage and cost. The plugin sends game context (roles, tasks, deaths, chat, votes) to that endpoint.
:::

## Commands

| Command | Aliases | Usage | Permission |
| :--- | :--- | :--- | :--- |
| `#narrator <question>` | `#nar`, `#n` | Ask for strategic advice | Everyone |
| `#narrator enable` | — | Enable the narrator for this game | Host |
| `#narrator disable` | — | Disable the narrator for this game | Host |
| `#narrator status` | — | Show current narrator status | Host |
| `#narrator limit <N>` | — | Set the per-game usage limit | Host |

```
#narrator
#nar What should I do?
```

The response is delivered as a private message to the requesting player.

## Configuration

Edit `[Empostor.Plugin.Narrator]Config.json` next to the plugin DLL.

```json
{
  "apiKey": "",
  "model": "deepseek-v4-flash",
  "apiEndpoint": "https://api.deepseek.com/",
  "maxUsesPerGame": 3,
  "maxUsesPerMeeting": 1
}
```

| Field | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `apiKey` | string | `""` | DeepSeek API key. Required — narration silently fails without it. |
| `model` | string | `"deepseek-v4-flash"` | Model ID sent to the API. |
| `apiEndpoint` | string | `"https://api.deepseek.com/"` | Base URL of the API. Change it to use a compatible provider. |
| `maxUsesPerGame` | int | `3` | Maximum narrator calls per player per game. |
| `maxUsesPerMeeting` | int | `1` | Maximum narrator calls per player per meeting. |

::: tip Before first use
Set `apiKey` before relying on `#narrator`. All other fields have working defaults.
:::

## Admin Panel

**Narrator** tab: API Key (masked), Model Name, API Endpoint, Max Uses Per Game, Max Uses Per Meeting. Changes are written to the config file.

## Related

- [Commands](../reference/commands.md) — full list of in-game commands.
