# Narrator Plugin

::: tip Plugin
This feature is provided by the **Empostor.Plugin.Narrator** plugin (`cn.hayashiume.narrator`). It must be installed and enabled for this to work.
:::

## Overview

The Narrator plugin provides an AI-powered strategic advisor during meetings. Players can ask the narrator for advice using chat commands. The AI considers the player's role (impostor or crewmate), completed tasks, dead players, chat log, votes, and game settings to provide contextual strategic advice.

## Commands

### `#narrator` (aliases: `#nar`, `#n`)

Ask the narrator for strategic advice during a meeting.

**Examples:**

```
#narrator
#n
#nar What should I do?
```

The AI response is sent as a private message to the requesting player.

### Host Controls

| Command | Description |
|---|---|
| `#narrator enable` | Enable the narrator for the current game |
| `#narrator disable` | Disable the narrator for the current game |
| `#narrator status` | Show current narrator status |
| `#narrator limit <N>` | Set the per-game usage limit |

## How It Works

1. When a meeting starts, the plugin captures the full game context: player roles, completed tasks, dead players, chat messages, and votes.
2. When a player uses `#narrator`, the plugin sends the context to the DeepSeek AI API.
3. The AI acts as a strategic advisor:
   - For crewmates: helps prove innocence and identify impostors
   - For impostors: helps craft believable cover stories
4. The response is delivered as a private chat message to the requesting player.
5. Per-game and per-meeting usage limits prevent spam.

## Configuration

Configuration is stored in `[Narrator]Config.json`:

```json
{
  "apiKey": "",
  "model": "deepseek-v4-flash",
  "apiEndpoint": "https://api.deepseek.com/",
  "maxUsesPerGame": 3,
  "maxUsesPerMeeting": 1
}
```

| Setting | Type | Default | Description |
|---|---|---|---|
| `apiKey` | string | `""` | DeepSeek API key |
| `model` | string | `"deepseek-v4-flash"` | AI model to use |
| `apiEndpoint` | string | `"https://api.deepseek.com/"` | API endpoint URL |
| `maxUsesPerGame` | int | `3` | Max narrator uses per player per game |
| `maxUsesPerMeeting` | int | `1` | Max narrator uses per player per meeting |

## Admin Panel

The narrator settings are accessible in the admin panel:

- **API Key** (secret input)
- **Model Name** (text input)
- **API Endpoint** (text input)
- **Max Uses Per Game** (number input)
- **Max Uses Per Meeting** (number input)

## Multi-Language Support

The plugin supports:
- English (`en`)
- Simplified Chinese (`zh_CN`)
- Traditional Chinese (`zh_TW`)
