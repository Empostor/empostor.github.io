# Welcome Messages Plugin

::: tip Plugin
This feature is provided by the **Empostor.Plugins.Welcome** plugin (`cn.hayashiume.welcome`). It must be installed and enabled for this to work.
:::

## Overview

The Welcome plugin sends localized welcome messages to players when they join a lobby. Messages are read from per-language template files, supporting placeholders for dynamic content and remote URL content fetching.

## How It Works

1. When a player spawns in the lobby (game state `NotStarted`), the plugin reads the template file matching the player's client language.
2. Placeholders in the template are replaced with actual values.
3. The message is sent as a chat message to the player.

## Template Files

The plugin creates a `Message/` directory with per-language template files:

```
Message/
├── EnglishHelloWord.txt
├── SChineseHelloWord.txt
├── TChineseHelloWord.txt
├── KoreanHelloWord.txt
├── RussianHelloWord.txt
├── GermanHelloWord.txt
├── FrenchHelloWord.txt
├── JapaneseHelloWord.txt
├── PortugueseHelloWord.txt
├── BrazilianPortugueseHelloWord.txt
├── SpanishHelloWord.txt
├── ItalianHelloWord.txt
├── DutchHelloWord.txt
├── FilipinoHelloWord.txt
├── IrishHelloWord.txt
└── LatamSpanishHelloWord.txt
```

If a language-specific file exists, it takes priority over the English fallback.

## Placeholders

| Placeholder | Description | Example |
|---|---|---|
| `{Name}` | Player display name | `Alice` |
| `{FriendCode}` | Player friend code | `matchduck#1337` |
| `{GameCode}` | Room code | `ABCDEF` |
| `{Room}` | Room code (alias) | `ABCDEF` |
| `{LastConnect}` | Last disconnect time (UTC) | `2026-05-24 15:30:00` |

`{LastConnect}` shows "First time here!" for new players.

## Advanced Features

### Remote Content (`<cave>` tags)

Fetch content from a URL and insert it into the message:

```
<cave>https://example.com/message.txt</cave>
```

Supports:
- Plain text
- Hitokoto API JSON: `{"hitokoto": "...", "from": "..."}`
- Generic JSON: `{"content": "..."}`

### Random Content (`<random>` tags)

Randomly pick one option from a JSON array:

```
<random = ["Option A", "Option B", "Option C"]>Default text</random>
```

## Example Template

```
Welcome back, {Name}! Room: {Room}
Last seen: {LastConnect}
<random = ["Have fun!", "Good luck!", "Enjoy the game!"]>Welcome!</random>
```

## Configuration

This plugin has no JSON configuration file. Configuration is entirely file-based via the `Message/` directory templates.
